import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsbKomponenBangunanProsNonstdRepository } from '../../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.repository';
import { AsbKomponenBangunanProsNonstd } from '../../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.entity';
import { AsbKomponenBangunanProsNonstdOrmEntity } from '../orm/asb_komponen_bangunan_pros_nonstd.orm_entity';
import { CreateAsbKomponenBangunanProsNonstdDto } from '../../../presentation/asb_komponen_bangunan_pros_nonstd/dto/create_asb_komponen_bangunan_pros_nonstd.dto';
import { GetAsbKomponenBangunanProsNonstdListDto } from 'src/presentation/asb_komponen_bangunan_pros_nonstd/dto/get_asb_komponen_bangunan_pros_nonstd_list.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbKomponenBangunanProsNonstdRepositoryImpl implements AsbKomponenBangunanProsNonstdRepository {
    constructor(
        @InjectRepository(AsbKomponenBangunanProsNonstdOrmEntity)
        private readonly repo: Repository<AsbKomponenBangunanProsNonstdOrmEntity>
    ) { }

    async create(data: CreateAsbKomponenBangunanProsNonstdDto): Promise<AsbKomponenBangunanProsNonstd> {
        try {
            const entity = plainToInstance(AsbKomponenBangunanProsNonstdOrmEntity, data);
            const saved = await this.repo.save(entity);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<AsbKomponenBangunanProsNonstd>): Promise<AsbKomponenBangunanProsNonstd> {
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

    async findById(id: number): Promise<AsbKomponenBangunanProsNonstd | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbKomponenBangunanProsNonstdListDto): Promise<{ data: AsbKomponenBangunanProsNonstd[], total: number }> {
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

    async findByKomponenBangunanNonstdId(id: number): Promise<AsbKomponenBangunanProsNonstd | null> {
        try {
            return await this.repo.findOne({ where: { idAsbKomponenBangunanNonstd: id } });
        } catch (error) {
            throw error;
        }
    }
}
