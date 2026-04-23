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
        const entity = plainToInstance(AsbKomponenBangunanNonstdOrmEntity, data);
        const saved = await this.repo.save(entity);
        return saved;
    }

    async update(id: number, data: Partial<AsbKomponenBangunanNonstd>): Promise<AsbKomponenBangunanNonstd> {
        await this.repo.update(id, data);
        const updated = await this.repo.findOne({ where: { id } });
        return updated!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<AsbKomponenBangunanNonstd | null> {
        const entity = await this.repo
            .createQueryBuilder('asb_komponen_bangunan_nonstd')
            .select(['asb_komponen_bangunan_nonstd.id', 'asb_komponen_bangunan_nonstd.komponen'])
            .where('asb_komponen_bangunan_nonstd.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findByKomponen(komponen: string): Promise<AsbKomponenBangunanNonstd | null> {
        const entity = await this.repo.findOne({
            where: { komponen: ILike(`%${komponen}%`) }
        });
        return entity || null;
    }

    async findAll(pagination: GetAsbKomponenBangunanNonstdsDto): Promise<{ data: AsbKomponenBangunanNonstd[], total: number }> {
        const where: any = {};

        if (pagination.id_asb_jenis !== undefined) {
            where.idAsbJenis = pagination.id_asb_jenis;
        }

        if (pagination.id_asb_tipe_bangunan !== undefined) {
            where.idAsbTipeBangunan = pagination.id_asb_tipe_bangunan;
        }

        if (pagination.search) {
            where.komponen = ILike(`%${pagination.search}%`);
        }

        const findOptions: any = {
            where: Object.keys(where).length > 0 ? where : undefined,
            order: { id: 'DESC' }
        };

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }

        const [items, total] = await this.repo.findAndCount(findOptions);
        return { data: items, total };
    }
}
