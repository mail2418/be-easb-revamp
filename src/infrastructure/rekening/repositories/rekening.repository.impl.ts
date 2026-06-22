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
import { applyIlikeSearch } from 'src/common/utils/search_query.util';

@Injectable()
export class RekeningRepositoryImpl implements RekeningRepository {
    constructor(@InjectRepository(RekeningOrmEntity) private readonly repo: Repository<RekeningOrmEntity>) {}

    async create(rekening: CreateRekeningDto): Promise<Rekening> {
        try {
            const now = new Date();
            const ormEntity = plainToInstance(RekeningOrmEntity, {
                ...rekening,
                bulan: now.getMonth() + 1,
                tahun: now.getFullYear(),
            });
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
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKode(rekeningKode: string): Promise<Rekening | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('rekening')
                .where('rekening.rekening_kode = :rekeningKode', { rekeningKode })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetRekeningsDto): Promise<{ data: Rekening[]; total: number }> {
        try {
            const qb = this.repo.createQueryBuilder('rekening');

            applyIlikeSearch(qb, 'rekening', ['rekening_kode', 'rekening_uraian'], pagination.search);

            const [data, total] = await qb
                .orderBy('rekening.id', 'DESC')
                .skip((pagination.page - 1) * pagination.amount)
                .take(pagination.amount)
                .getManyAndCount();

            return { data, total };
        } catch (error) {
            throw error;
        }
    }
}
