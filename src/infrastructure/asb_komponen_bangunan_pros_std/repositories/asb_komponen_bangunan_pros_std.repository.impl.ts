import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsbKomponenBangunanProsStdRepository } from '../../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.repository';
import { AsbKomponenBangunanProsStd } from '../../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.entity';
import { AsbKomponenBangunanProsStdOrmEntity } from '../orm/asb_komponen_bangunan_pros_std.orm_entity';
import { CreateAsbKomponenBangunanProsStdDto } from '../../../presentation/asb_komponen_bangunan_pros_std/dto/create_asb_komponen_bangunan_pros_std.dto';
import { GetAsbKomponenBangunanProsStdListDto } from '../../../presentation/asb_komponen_bangunan_pros_std/dto/get_asb_komponen_bangunan_pros_std_list.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbKomponenBangunanProsStdRepositoryImpl implements AsbKomponenBangunanProsStdRepository {
    constructor(
        @InjectRepository(AsbKomponenBangunanProsStdOrmEntity)
        private readonly repo: Repository<AsbKomponenBangunanProsStdOrmEntity>
    ) { }

    async create(data: CreateAsbKomponenBangunanProsStdDto): Promise<AsbKomponenBangunanProsStd> {
        try {
            const entity = plainToInstance(AsbKomponenBangunanProsStdOrmEntity, data);
            const saved = await this.repo.save(entity);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<AsbKomponenBangunanProsStd>): Promise<AsbKomponenBangunanProsStd> {
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

    async findById(id: number): Promise<AsbKomponenBangunanProsStd | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbKomponenBangunanProsStdListDto): Promise<{ data: AsbKomponenBangunanProsStd[], total: number }> {
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

    async findByKomponenBangunanStdId(id: number): Promise<AsbKomponenBangunanProsStd | null> {
        try {
            return await this.repo.findOne({ where: { idAsbKomponenBangunanStd: id } });
        } catch (error) {
            throw error;
        }
    }
}
