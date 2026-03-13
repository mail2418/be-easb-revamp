import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { AsbKomponenBangunanNonstdRepository } from '../../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.repository';
import { AsbKomponenBangunanNonstd } from '../../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.entity';
import { AsbKomponenBangunanNonstdOrmEntity } from '../orm/asb_komponen_bangunan_nonstd.orm_entity';
import { CreateAsbKomponenBangunanNonstdDto } from '../../../presentation/asb_komponen_bangunan_nonstd/dto/create_asb_komponen_bangunan_nonstd.dto';
import { GetAsbKomponenBangunanNonstdsDto } from '../../../presentation/asb_komponen_bangunan_nonstd/dto/get_asb_komponen_bangunan_nonstds.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbKomponenBangunanNonstdRepositoryImpl implements AsbKomponenBangunanNonstdRepository {
    constructor(
        @InjectRepository(AsbKomponenBangunanNonstdOrmEntity)
        private readonly repo: Repository<AsbKomponenBangunanNonstdOrmEntity>
    ) { }

    async create(data: CreateAsbKomponenBangunanNonstdDto): Promise<AsbKomponenBangunanNonstd> {
        try {
            const entity = plainToInstance(AsbKomponenBangunanNonstdOrmEntity, data);
            const saved = await this.repo.save(entity);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<AsbKomponenBangunanNonstd>): Promise<AsbKomponenBangunanNonstd> {
        try {
            await this.repo.update(id, data);
            const updated = await this.repo.findOne({ where: { id } });
            return updated!;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id)
                .then(() => true)
                .catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbKomponenBangunanNonstd | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponen(komponen: string): Promise<AsbKomponenBangunanNonstd | null> {
        try {
            const entity = await this.repo.findOne({
                where: { komponen: ILike(`%${komponen}%`) }
            });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbKomponenBangunanNonstdsDto): Promise<{ data: AsbKomponenBangunanNonstd[], total: number }> {
        try {
            const [items, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' }
            });
            return { data: items, total };
        } catch (error) {
            throw error;
        }
    }
}
