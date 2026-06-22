import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbKlasifikasiRepository } from '../../../domain/asb_klasifikasi/asb_klasifikasi.repository';
import { AsbKlasifikasi } from '../../../domain/asb_klasifikasi/asb_klasifikasi.entity';
import { AsbKlasifikasiOrmEntity } from '../orm/asb_klasifikasi.orm_entity';
import { CreateAsbKlasifikasiDto } from '../../../presentation/asb_klasifikasi/dto/create_asb_klasifikasi.dto';
import { GetAsbKlasifikasisDto } from '../../../presentation/asb_klasifikasi/dto/get_asb_klasifikasis.dto';

@Injectable()
export class AsbKlasifikasiRepositoryImpl implements AsbKlasifikasiRepository {
    constructor(
        @InjectRepository(AsbKlasifikasiOrmEntity)
        private readonly repo: Repository<AsbKlasifikasiOrmEntity>,
    ) {}

    async create(asbKlasifikasi: CreateAsbKlasifikasiDto): Promise<AsbKlasifikasi> {
        const ormEntity = plainToInstance(AsbKlasifikasiOrmEntity, asbKlasifikasi);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(id: number, asbKlasifikasi: Partial<AsbKlasifikasi>): Promise<AsbKlasifikasi> {
        await this.repo.update(id, asbKlasifikasi);
        const updatedEntity = await this.repo.findOne({ where: { id }, relations: ['asbTipeBangunan'] });
        return updatedEntity!;
    }
    
    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<AsbKlasifikasi | null> {
        const entity = await this.repo.findOne({ where: { id }, relations: ['asbTipeBangunan'] });
        return entity || null;
    }

    async findAll(pagination: GetAsbKlasifikasisDto): Promise<{ data: AsbKlasifikasi[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' },
            relations: ['asbTipeBangunan']
        };

        if (pagination.search) {
            findOptions.where = { klasifikasi: ILike(`%${pagination.search}%`) };
        }

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }

    async findByAsbTipeBangunan(id_asb_tipe_bangunan: number): Promise<AsbKlasifikasi | null> {
        const entity = await this.repo.findOne({ where: { id_asb_tipe_bangunan }, relations: ['asbTipeBangunan'] });
        return entity || null;
    }

    async findByKlasifikasi(klasifikasi: string): Promise<AsbKlasifikasi | null> {
        const entity = await this.repo.findOne({
            where: { klasifikasi }
        });
        return entity || null;
    }
}
