import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JalanSpesifikasiDesainReviewRepository } from '../../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.repository';
import { JalanSpesifikasiDesainReviewOrmEntity } from '../orm/jalan_spesifikasi_desain_review.orm_entity';
import { JalanSpesifikasiDesainReview } from '../../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.entity';
import { CreateJalanSpesifikasiDesainReviewDto } from '../../../presentation/jalan_spesifikasi_desain_review/dto/create_jalan_spesifikasi_desain_review.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateJalanSpesifikasiDesainReviewDto } from '../../../presentation/jalan_spesifikasi_desain_review/dto/update_jalan_spesifikasi_desain_review.dto';
import { GetJalanSpesifikasiDesainReviewDto } from '../../../presentation/jalan_spesifikasi_desain_review/dto/get_jalan_spesifikasi_desain_review.dto';

@Injectable()
export class JalanSpesifikasiDesainReviewRepositoryImpl
    implements JalanSpesifikasiDesainReviewRepository
{
    constructor(
        @InjectRepository(JalanSpesifikasiDesainReviewOrmEntity)
        private readonly repo: Repository<JalanSpesifikasiDesainReviewOrmEntity>,
    ) {}

    async create(
        dto: CreateJalanSpesifikasiDesainReviewDto,
    ): Promise<JalanSpesifikasiDesainReview> {
        const ormEntity = plainToInstance(JalanSpesifikasiDesainReviewOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(
        dto: UpdateJalanSpesifikasiDesainReviewDto,
    ): Promise<JalanSpesifikasiDesainReview> {
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

    async findById(id: number): Promise<JalanSpesifikasiDesainReview | null> {
        const entity = await this.repo
            .createQueryBuilder('jsd_review')
            .select([
                'jsd_review.id',
                'jsd_review.id_usulan_jalan',
                'jsd_review.id_ruang_lingkup',
                'jsd_review.id_hspk',
                'jsd_review.volume_review',
                'jsd_review.spasi_review',
                'jsd_review.tinggi_review',
                'jsd_review.harga_spec_review',
            ])
            .leftJoin('jsd_review.usulanJalan', 'usulan_jalan')
            .addSelect(['usulan_jalan.id', 'usulan_jalan.nama_usulan'])
            .leftJoin('jsd_review.ruangLingkup', 'ruang_lingkup')
            .addSelect(['ruang_lingkup.id', 'ruang_lingkup.deskripsi_ruang_lingkup'])
            .leftJoin('jsd_review.hspk', 'hspk')
            .addSelect([
                'hspk.id',
                'hspk.no_mata_pembayaran',
                'hspk.satuan',
                'hspk.harga_satuan',
                'hspk.uraian',
            ])
            .where('jsd_review.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(
        dto: GetJalanSpesifikasiDesainReviewDto,
    ): Promise<{ data: JalanSpesifikasiDesainReview[]; total: number }> {
        const queryBuilder = this.repo
            .createQueryBuilder('jsd_review')
            .select([
                'jsd_review.id',
                'jsd_review.id_usulan_jalan',
                'jsd_review.id_ruang_lingkup',
                'jsd_review.id_hspk',
                'jsd_review.volume_review',
                'jsd_review.spasi_review',
                'jsd_review.tinggi_review',
                'jsd_review.harga_spec_review',
            ])
            .leftJoin('jsd_review.usulanJalan', 'usulan_jalan')
            .addSelect(['usulan_jalan.id', 'usulan_jalan.nama_usulan'])
            .leftJoin('jsd_review.ruangLingkup', 'ruang_lingkup')
            .addSelect(['ruang_lingkup.id', 'ruang_lingkup.deskripsi_ruang_lingkup'])
            .leftJoin('jsd_review.hspk', 'hspk')
            .addSelect([
                'hspk.id',
                'hspk.no_mata_pembayaran',
                'hspk.satuan',
                'hspk.harga_satuan',
                'hspk.uraian',
            ])
            .orderBy('jsd_review.id', 'DESC');

        if (dto.page !== undefined && dto.amount !== undefined) {
            const skip = (dto.page - 1) * dto.amount;
            queryBuilder.skip(skip).take(dto.amount);
        }

        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        await this.repo.softDelete({ id_usulan_jalan: idUsulanJalan });
    }

    async findByUsulanJalan(
        idUsulanJalan: number,
        page?: number,
        amount?: number,
    ): Promise<[JalanSpesifikasiDesainReview[], number]> {
        const queryBuilder = this.repo
            .createQueryBuilder('jsd_review')
            .select([
                'jsd_review.id',
                'jsd_review.id_usulan_jalan',
                'jsd_review.id_ruang_lingkup',
                'jsd_review.id_hspk',
                'jsd_review.volume_review',
                'jsd_review.spasi_review',
                'jsd_review.tinggi_review',
                'jsd_review.harga_spec_review',
            ])
            .leftJoin('jsd_review.usulanJalan', 'usulan_jalan')
            .addSelect(['usulan_jalan.id', 'usulan_jalan.nama_usulan'])
            .leftJoin('jsd_review.ruangLingkup', 'ruang_lingkup')
            .addSelect(['ruang_lingkup.id', 'ruang_lingkup.deskripsi_ruang_lingkup'])
            .leftJoin('jsd_review.hspk', 'hspk')
            .addSelect([
                'hspk.id',
                'hspk.no_mata_pembayaran',
                'hspk.satuan',
                'hspk.harga_satuan',
                'hspk.uraian',
            ])
            .where('jsd_review.id_usulan_jalan = :idUsulanJalan', { idUsulanJalan })
            .orderBy('jsd_review.id', 'DESC');

        if (page !== undefined && amount !== undefined) {
            const skip = (page - 1) * amount;
            queryBuilder.skip(skip).take(amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        return [entities, total];
    }
}
