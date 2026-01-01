import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { AsbKomponenBangunanStdRepository } from '../../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.repository';
import { AsbKomponenBangunanStd } from '../../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.entity';
import { AsbKomponenBangunanStdOrmEntity } from '../orm/asb_komponen_bangunan_std.orm_entity';
import { CreateAsbKomponenBangunanStdDto } from '../../../presentation/asb_komponen_bangunan_std/dto/create_asb_komponen_bangunan_std.dto';
import { GetAsbKomponenBangunanStdsDto } from '../../../presentation/asb_komponen_bangunan_std/dto/get_asb_komponen_bangunan_stds.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbKomponenBangunanStdRepositoryImpl implements AsbKomponenBangunanStdRepository {
    constructor(
        @InjectRepository(AsbKomponenBangunanStdOrmEntity)
        private readonly repo: Repository<AsbKomponenBangunanStdOrmEntity>
    ) { }

    async create(data: CreateAsbKomponenBangunanStdDto): Promise<AsbKomponenBangunanStd> {
        try {
            const entity = plainToInstance(AsbKomponenBangunanStdOrmEntity, data);
            const saved = await this.repo.save(entity);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<AsbKomponenBangunanStd>): Promise<AsbKomponenBangunanStd> {
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

    async findById(id: number): Promise<AsbKomponenBangunanStd | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('asb_komponen_bangunan_std')
                .select(['asb_komponen_bangunan_std.id', 'asb_komponen_bangunan_std.komponen'])
                .where('asb_komponen_bangunan_std.id = :id', { id })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponen(komponen: string): Promise<AsbKomponenBangunanStd | null> {
        try {
            const entity = await this.repo.findOne({
                where: { komponen: ILike(`%${komponen}%`) }
            });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbKomponenBangunanStdsDto): Promise<{ data: AsbKomponenBangunanStd[], total: number }> {
        try {
            const where: any = {};

            if (pagination.id_asb_jenis !== undefined) {
                where.idAsbJenis = pagination.id_asb_jenis;
            }

            if (pagination.id_asb_tipe_bangunan !== undefined) {
                where.idAsbTipeBangunan = pagination.id_asb_tipe_bangunan;
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
        } catch (error) {
            throw error;
        }
    }
}
