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
        const entity = plainToInstance(AsbKomponenBangunanProsStdOrmEntity, data);
        const saved = await this.repo.save(entity);
        return saved;
    }

    async update(id: number, data: Partial<AsbKomponenBangunanProsStd>): Promise<AsbKomponenBangunanProsStd> {
        await this.repo.update(id, data);
        const updated = await this.repo.findOne({ where: { id } });
        return updated!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<AsbKomponenBangunanProsStd | null> {
        const entity = await this.repo
            .createQueryBuilder('asb_komponen_bangunan_pros_std')
            .select(['asb_komponen_bangunan_pros_std.id', 'asb_komponen_bangunan_pros_std.avgMin', 'asb_komponen_bangunan_pros_std.avgMax', 'asb_komponen_bangunan_pros_std.max', 'asb_komponen_bangunan_pros_std.avg'])
            .where('asb_komponen_bangunan_pros_std.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(pagination: GetAsbKomponenBangunanProsStdListDto): Promise<{ data: AsbKomponenBangunanProsStd[], total: number }> {
        const queryBuilder = this.repo
            .createQueryBuilder('asb_komponen_bangunan_pros_std')
            .select(['asb_komponen_bangunan_pros_std.id', 'asb_komponen_bangunan_pros_std.avgMin', 'asb_komponen_bangunan_pros_std.avgMax', 'asb_komponen_bangunan_pros_std.max', 'asb_komponen_bangunan_pros_std.avg'])
            .orderBy('asb_komponen_bangunan_pros_std.id', 'DESC');

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            const skip = (pagination.page - 1) * pagination.amount;
            queryBuilder.skip(skip).take(pagination.amount);
        }

        const [items, total] = await queryBuilder.getManyAndCount();
        return { data: items, total };
    }

    async findByKomponenBangunanStdId(id: number): Promise<AsbKomponenBangunanProsStd | null> {
        return await this.repo
            .createQueryBuilder('asb_komponen_bangunan_pros_std')
            .select(['asb_komponen_bangunan_pros_std.id', 'asb_komponen_bangunan_pros_std.avgMin', 'asb_komponen_bangunan_pros_std.avgMax', 'asb_komponen_bangunan_pros_std.max', 'asb_komponen_bangunan_pros_std.avg'])
            .where('asb_komponen_bangunan_pros_std.id_asb_komponen_bangunan_std = :id', { id })
            .getOne();
    }
}
