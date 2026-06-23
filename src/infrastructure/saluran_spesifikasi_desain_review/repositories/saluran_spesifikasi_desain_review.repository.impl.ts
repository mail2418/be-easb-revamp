import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaluranSpesifikasiDesainReviewRepository } from '../../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.repository';
import { SaluranSpesifikasiDesainReviewOrmEntity } from '../orm/saluran_spesifikasi_desain_review.orm_entity';
import { SaluranSpesifikasiDesainReview } from '../../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.entity';
import { CreateSaluranSpesifikasiDesainReviewDto } from '../../../presentation/saluran_spesifikasi_desain_review/dto/create_saluran_spesifikasi_desain_review.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateSaluranSpesifikasiDesainReviewDto } from '../../../presentation/saluran_spesifikasi_desain_review/dto/update_saluran_spesifikasi_desain_review.dto';
import { GetSaluranSpesifikasiDesainReviewDto } from '../../../presentation/saluran_spesifikasi_desain_review/dto/get_saluran_spesifikasi_desain_review.dto';

@Injectable()
export class SaluranSpesifikasiDesainReviewRepositoryImpl
    implements SaluranSpesifikasiDesainReviewRepository
{
    constructor(
        @InjectRepository(SaluranSpesifikasiDesainReviewOrmEntity)
        private readonly repo: Repository<SaluranSpesifikasiDesainReviewOrmEntity>,
    ) {}

    async create(
        dto: CreateSaluranSpesifikasiDesainReviewDto & {
            volume_review?: number;
            harga_spec_review?: number;
        },
    ): Promise<SaluranSpesifikasiDesainReview> {
        const ormEntity = plainToInstance(SaluranSpesifikasiDesainReviewOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(
        dto: UpdateSaluranSpesifikasiDesainReviewDto,
    ): Promise<SaluranSpesifikasiDesainReview> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo
            .softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<SaluranSpesifikasiDesainReview | null> {
        const entity = await this.repo
            .createQueryBuilder('ssd_review')
            .select([
                'ssd_review.id',
                'ssd_review.id_usulan_saluran',
                'ssd_review.id_ruang_lingkup',
                'ssd_review.id_hspk',
                'ssd_review.volume_review',
                'ssd_review.spasi_review',
                'ssd_review.tinggi_review',
                'ssd_review.harga_spec_review',
                'ssd_review.keterangan_tambahan_review',
            ])
            .where('ssd_review.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(
        dto: GetSaluranSpesifikasiDesainReviewDto,
    ): Promise<{ data: SaluranSpesifikasiDesainReview[]; total: number }> {
        const queryBuilder = this.repo
            .createQueryBuilder('ssd_review')
            .select([
                'ssd_review.id',
                'ssd_review.id_usulan_saluran',
                'ssd_review.id_ruang_lingkup',
                'ssd_review.id_hspk',
                'ssd_review.volume_review',
                'ssd_review.spasi_review',
                'ssd_review.tinggi_review',
                'ssd_review.harga_spec_review',
                'ssd_review.keterangan_tambahan_review',
            ])
            .orderBy('ssd_review.id', 'DESC');

        if (dto.id_usulan_saluran !== undefined) {
            queryBuilder.where('ssd_review.id_usulan_saluran = :id_usulan_saluran', {
                id_usulan_saluran: dto.id_usulan_saluran,
            });
        }

        if (dto.page !== undefined && dto.amount !== undefined) {
            const skip = (dto.page - 1) * dto.amount;
            queryBuilder.skip(skip).take(dto.amount);
        }

        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.repo.softDelete({ id_usulan_saluran: idUsulanSaluran });
    }

    async findByUsulanSaluran(
        idUsulanSaluran: number,
        page?: number,
        amount?: number,
    ): Promise<[SaluranSpesifikasiDesainReview[], number]> {
        const queryBuilder = this.repo
            .createQueryBuilder('ssd_review')
            .select([
                'ssd_review.id',
                'ssd_review.id_usulan_saluran',
                'ssd_review.id_ruang_lingkup',
                'ssd_review.id_hspk',
                'ssd_review.volume_review',
                'ssd_review.spasi_review',
                'ssd_review.tinggi_review',
                'ssd_review.harga_spec_review',
                'ssd_review.keterangan_tambahan_review',
            ])
            .where('ssd_review.id_usulan_saluran = :idUsulanSaluran', { idUsulanSaluran })
            .orderBy('ssd_review.id', 'DESC');

        if (page !== undefined && amount !== undefined) {
            const skip = (page - 1) * amount;
            queryBuilder.skip(skip).take(amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        return [entities, total];
    }
}
