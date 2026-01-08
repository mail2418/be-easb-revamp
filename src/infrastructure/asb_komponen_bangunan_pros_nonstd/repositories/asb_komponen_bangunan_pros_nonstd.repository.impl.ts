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
        const entity = plainToInstance(AsbKomponenBangunanProsNonstdOrmEntity, data);
        const saved = await this.repo.save(entity);
        return saved;
    }

    async update(id: number, data: Partial<AsbKomponenBangunanProsNonstd>): Promise<AsbKomponenBangunanProsNonstd> {
        await this.repo.update(id, data);
        const updated = await this.repo.findOne({ where: { id } });
        return updated!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<AsbKomponenBangunanProsNonstd | null> {
        const entity = await this.repo
            .createQueryBuilder('asb_komponen_bangunan_pros_nonstd')
            .select(['asb_komponen_bangunan_pros_nonstd.id', 'asb_komponen_bangunan_pros_nonstd.avgMin', 'asb_komponen_bangunan_pros_nonstd.avgMax', 'asb_komponen_bangunan_pros_nonstd.max', 'asb_komponen_bangunan_pros_nonstd.avg'])
            .where('asb_komponen_bangunan_pros_nonstd.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(pagination: GetAsbKomponenBangunanProsNonstdListDto): Promise<{ data: AsbKomponenBangunanProsNonstd[], total: number }> {
        const queryBuilder = this.repo
            .createQueryBuilder('asb_komponen_bangunan_pros_nonstd')
            .select(['asb_komponen_bangunan_pros_nonstd.id', 'asb_komponen_bangunan_pros_nonstd.avgMin', 'asb_komponen_bangunan_pros_nonstd.avgMax', 'asb_komponen_bangunan_pros_nonstd.max', 'asb_komponen_bangunan_pros_nonstd.avg'])
            .orderBy('asb_komponen_bangunan_pros_nonstd.id', 'DESC');

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            const skip = (pagination.page - 1) * pagination.amount;
            queryBuilder.skip(skip).take(pagination.amount);
        }

        const [items, total] = await queryBuilder.getManyAndCount();
        return { data: items, total };
    }

    async findByKomponenBangunanNonstdId(id: number): Promise<AsbKomponenBangunanProsNonstd | null> {
        return await this.repo
            .createQueryBuilder('asb_komponen_bangunan_pros_nonstd')
            .select(['asb_komponen_bangunan_pros_nonstd.id', 'asb_komponen_bangunan_pros_nonstd.avgMin', 'asb_komponen_bangunan_pros_nonstd.avgMax', 'asb_komponen_bangunan_pros_nonstd.max', 'asb_komponen_bangunan_pros_nonstd.avg'])
            .where('asb_komponen_bangunan_pros_nonstd.id_asb_komponen_bangunan_nonstd = :id', { id })
            .getOne();
    }
}
