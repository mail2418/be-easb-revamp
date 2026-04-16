import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HspkRepository } from '../../../domain/hspk/hspk.repository';
import { HspkOrmEntity } from '../orm/hspk.orm_entity';
import { Hspk } from '../../../domain/hspk/hspk.entity';
import { CreateHspkDto } from '../../../presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from '../../../presentation/hspk/dto/update_hspk.dto';
import { GetHspkDto } from '../../../presentation/hspk/dto/get_hspk.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class HspkRepositoryImpl implements HspkRepository {
    constructor(
        @InjectRepository(HspkOrmEntity)
        private readonly repo: Repository<HspkOrmEntity>
    ) {}

    async create(dto: CreateHspkDto): Promise<Hspk> {
        const ormEntity = plainToInstance(HspkOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async bulkCreate(dtos: CreateHspkDto[]): Promise<Hspk[]> {
        return await this.repo.manager.transaction(async (manager) => {
            const repo = manager.getRepository(HspkOrmEntity);
            const entities = dtos.map((dto) => plainToInstance(HspkOrmEntity, dto));
            return await repo.save(entities);
        });
    }

    async update(dto: UpdateHspkDto): Promise<Hspk> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<Hspk | null> {
        const entity = await this.repo
            .createQueryBuilder('hspk')
            .select([
                'hspk.id',
                'hspk.id_ruang_lingkup',
                'hspk.tahun_anggaran',
                'hspk.no_mata_pembayaran',
                'hspk.satuan',
                'hspk.harga_satuan',
                'hspk.uraian'
            ])
            .where('hspk.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(dto: GetHspkDto): Promise<{ data: Hspk[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' }
        };

        if (dto.tahun_anggaran !== undefined) {
            findOptions.where = { tahun_anggaran: dto.tahun_anggaran };
        }

        if (dto.page !== undefined && dto.amount !== undefined) {
            findOptions.skip = (dto.page - 1) * dto.amount;
            findOptions.take = dto.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }

    async findByNoMataPembayaranAndTahun(no_mata_pembayaran: string, tahun_anggaran: number): Promise<Hspk | null> {
        const entity = await this.repo.findOne({ where: { no_mata_pembayaran, tahun_anggaran } });
        return entity || null;
    }

    async findByRuangLingkup(id_ruang_lingkup: number, tahun_anggaran?: number): Promise<Hspk[]> {
        const where: { id_ruang_lingkup: number; tahun_anggaran?: number } = { id_ruang_lingkup };
        if (tahun_anggaran !== undefined) {
            where.tahun_anggaran = tahun_anggaran;
        }
        const entities = await this.repo.find({ where });
        return entities;
    }
}

