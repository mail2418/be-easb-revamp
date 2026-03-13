import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        try {
            const ormEntity = plainToInstance(AsbKlasifikasiOrmEntity, asbKlasifikasi);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, asbKlasifikasi: Partial<AsbKlasifikasi>): Promise<AsbKlasifikasi> {
        try {
            await this.repo.update(id, asbKlasifikasi);
            const updatedEntity = await this.repo.findOne({ where: { id }, relations: ['asbTipeBangunan'] });
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

    async findById(id: number): Promise<AsbKlasifikasi | null> {
        try {
            const entity = await this.repo.findOne({ where: { id }, relations: ['asbTipeBangunan'] });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbKlasifikasisDto): Promise<{ data: AsbKlasifikasi[]; total: number }> {
        try {
            const [data, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' },
                relations: ['asbTipeBangunan']
            });

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findByAsbTipeBangunan(id_asb_tipe_bangunan: number): Promise<AsbKlasifikasi | null> {
        try {
            const entity = await this.repo.findOne({ where: { id_asb_tipe_bangunan }, relations: ['asbTipeBangunan'] });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKlasifikasi(klasifikasi: string): Promise<AsbKlasifikasi | null> {
        try {
            const entity = await this.repo.findOne({
                where: { klasifikasi }
            });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
