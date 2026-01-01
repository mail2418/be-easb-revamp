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
        try {
            const ormEntity = plainToInstance(HspkOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateHspkDto): Promise<Hspk> {
        try {
            const { id, ...updateData } = dto;
            await this.repo.update(id, updateData);
            const updatedEntity = await this.repo.findOne({ where: { id } });
            return updatedEntity!;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id).then(() => true).catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Hspk | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('hspk')
                .select([
                    'hspk.id',
                    'hspk.id_ruang_lingkup',
                    'hspk.no_mata_pembayaran',
                    'hspk.satuan',
                    'hspk.harga_satuan',
                    'hspk.uraian'
                ])
                .where('hspk.id = :id', { id })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetHspkDto): Promise<{ data: Hspk[]; total: number }> {
        try {
            const findOptions: any = {
                order: { id: 'DESC' }
            };

            if (dto.page !== undefined && dto.amount !== undefined) {
                findOptions.skip = (dto.page - 1) * dto.amount;
                findOptions.take = dto.amount;
            }

            const [data, total] = await this.repo.findAndCount(findOptions);

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findByNoMataPembayaran(no_mata_pembayaran: string): Promise<Hspk | null> {
        try {
            const entity = await this.repo.findOne({ where: { no_mata_pembayaran } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByRuangLingkup(id_ruang_lingkup: number): Promise<Hspk[]> {
        try {
            const entities = await this.repo.find({ where: { id_ruang_lingkup } });
            return entities;
        } catch (error) {
            throw error;
        }
    }
}

