import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaluranSpesifikasiDesainRepository } from '../../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.repository';
import { SaluranSpesifikasiDesainOrmEntity } from '../orm/saluran_spesifikasi_desain.orm_entity';
import { SaluranSpesifikasiDesain } from '../../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.entity';
import { CreateSaluranSpesifikasiDesainDto } from '../../../presentation/saluran_spesifikasi_desain/dto/create_saluran_spesifikasi_desain.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateSaluranSpesifikasiDesainDto } from '../../../presentation/saluran_spesifikasi_desain/dto/update_saluran_spesifikasi_desain.dto';
import { GetSaluranSpesifikasiDesainDto } from '../../../presentation/saluran_spesifikasi_desain/dto/get_saluran_spesifikasi_desain.dto';

@Injectable()
export class SaluranSpesifikasiDesainRepositoryImpl implements SaluranSpesifikasiDesainRepository {
    constructor(
        @InjectRepository(SaluranSpesifikasiDesainOrmEntity)
        private readonly repo: Repository<SaluranSpesifikasiDesainOrmEntity>,
    ) {}

    async create(
        dto: CreateSaluranSpesifikasiDesainDto & { volume?: number; harga_spec?: number },
    ): Promise<SaluranSpesifikasiDesain> {
        const ormEntity = plainToInstance(SaluranSpesifikasiDesainOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateSaluranSpesifikasiDesainDto): Promise<SaluranSpesifikasiDesain> {
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

    async findById(id: number): Promise<SaluranSpesifikasiDesain | null> {
        const entity = await this.repo
            .createQueryBuilder('ssd')
            .select([
                'ssd.id',
                'ssd.id_usulan_saluran',
                'ssd.id_ruang_lingkup',
                'ssd.id_hspk',
                'ssd.volume',
                'ssd.spasi',
                'ssd.tinggi',
                'ssd.harga_spec',
                'ssd.keterangan_tambahan',
            ])
            .where('ssd.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(
        dto: GetSaluranSpesifikasiDesainDto,
    ): Promise<{ data: SaluranSpesifikasiDesain[]; total: number }> {
        const queryBuilder = this.repo
            .createQueryBuilder('ssd')
            .select([
                'ssd.id',
                'ssd.id_usulan_saluran',
                'ssd.id_ruang_lingkup',
                'ssd.id_hspk',
                'ssd.volume',
                'ssd.spasi',
                'ssd.tinggi',
                'ssd.harga_spec',
                'ssd.keterangan_tambahan',
            ])
            .orderBy('ssd.id', 'DESC');

        if (dto.id_usulan_saluran !== undefined) {
            queryBuilder.where('ssd.id_usulan_saluran = :id_usulan_saluran', {
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
    ): Promise<[SaluranSpesifikasiDesain[], number]> {
        const queryBuilder = this.repo
            .createQueryBuilder('ssd')
            .select([
                'ssd.id',
                'ssd.id_usulan_saluran',
                'ssd.id_ruang_lingkup',
                'ssd.id_hspk',
                'ssd.volume',
                'ssd.spasi',
                'ssd.tinggi',
                'ssd.harga_spec',
                'ssd.keterangan_tambahan',
            ])
            .where('ssd.id_usulan_saluran = :idUsulanSaluran', { idUsulanSaluran })
            .orderBy('ssd.id', 'DESC');

        if (page !== undefined && amount !== undefined) {
            const skip = (page - 1) * amount;
            queryBuilder.skip(skip).take(amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        return [entities, total];
    }
}
