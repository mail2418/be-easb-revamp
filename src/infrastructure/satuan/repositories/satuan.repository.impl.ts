import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SatuanRepository } from '../../../domain/satuan/satuan.repository';
import { Satuan } from '../../../domain/satuan/satuan.entity';
import { SatuanOrmEntity } from '../orm/satuan.orm_entity';
import { CreateSatuanDto } from '../../../presentation/satuan/dto/create_satuan.dto';
import { GetSatuansDto } from '../../../presentation/satuan/dto/get_satuans.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SatuanRepositoryImpl implements SatuanRepository {
    constructor(@InjectRepository(SatuanOrmEntity) private readonly repo: Repository<SatuanOrmEntity>) {}

    async create(satuan: CreateSatuanDto): Promise<Satuan> {
        try {
            const satuanOrm = plainToInstance(SatuanOrmEntity, satuan);
            const newSatuan = await this.repo.save(satuanOrm);
            return newSatuan;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<Satuan>): Promise<Satuan> {
        try {
            await this.repo.update(id, data);
            const updatedSatuan = await this.repo.findOne({ where: { id } });
            return updatedSatuan!;
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

    async findById(id: number): Promise<Satuan | null> {
        try {
            const satuan = await this.repo.findOne({ where: { id } });
            return satuan || null;
        } catch (error) {
            throw error;
        }
    }

    async findBySatuan(satuan: string): Promise<Satuan | null> {
        try {
            const satuanData = await this.repo.findOne({ where: { satuan } }).catch((error) => {
                console.error('Error finding satuan by satuan:', error);
                throw error;
            });
            return satuanData || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetSatuansDto): Promise<{ data: Satuan[], total: number }> {
        try {
            const [satuans, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' }
            }).catch((error) => {
                console.error('Error fetching satuans:', error);
                throw error;
            });

            return { data: satuans, total };
        } catch (error) {
            throw error;
        }
    }
}
