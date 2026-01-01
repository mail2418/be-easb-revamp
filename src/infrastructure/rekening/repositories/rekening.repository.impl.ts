import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RekeningRepository } from '../../../domain/rekening/rekening.repository';
import { Rekening } from '../../../domain/rekening/rekening.entity';
import { RekeningOrmEntity } from '../orm/rekening.orm_entity';
import { CreateRekeningDto } from '../../../presentation/rekening/dto/create_rekening.dto';
import { UpdateRekeningDto } from '../../../presentation/rekening/dto/update_rekening.dto';
import { GetRekeningsDto } from '../../../presentation/rekening/dto/get_rekenings.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RekeningRepositoryImpl implements RekeningRepository {
    constructor(@InjectRepository(RekeningOrmEntity) private readonly repo: Repository<RekeningOrmEntity>) {}

    async create(rekening: CreateRekeningDto): Promise<Rekening> {
        try {
            const ormEntity = plainToInstance(RekeningOrmEntity, rekening);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, rekening: Partial<Rekening>): Promise<Rekening> {
        try {
            await this.repo.update(id, rekening);
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

    async findById(id: number): Promise<Rekening | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('rekening')
                .select(['rekening.id', 'rekening.rekening_kode', 'rekening.rekening'])
                .where('rekening.id = :id', { id })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKode(rekeningKode: string): Promise<Rekening | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('rekening')
                .select(['rekening.id', 'rekening.rekening_kode', 'rekening.rekening'])
                .where('rekening.rekening_kode LIKE :rekeningKode', { rekeningKode: `%${rekeningKode}%` })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetRekeningsDto): Promise<{ data: Rekening[]; total: number }> {
        try {
            const findOptions: any = {
                order: { id: 'DESC' }
            };

            if (pagination.page !== undefined && pagination.amount !== undefined) {
                findOptions.skip = (pagination.page - 1) * pagination.amount;
                findOptions.take = pagination.amount;
            }

            const [data, total] = await this.repo.findAndCount(findOptions);

            return { data, total };
        } catch (error) {
            throw error;
        }
    }
}
