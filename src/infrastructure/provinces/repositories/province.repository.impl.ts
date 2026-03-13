import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinceRepository } from '../../../domain/provinces/province.repository';
import { Province } from '../../../domain/provinces/province.entity';
import { ProvinceOrmEntity } from '../orm/province.orm_entity';
import { CreateProvinceDto } from 'src/presentation/provinces/dto/create_province.dto';
import { GetProvincesDto } from 'src/presentation/provinces/dto/get_provinces.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProvinceRepositoryImpl implements ProvinceRepository {
    constructor(@InjectRepository(ProvinceOrmEntity) private readonly repo: Repository<ProvinceOrmEntity>) {}

    async create(province: CreateProvinceDto): Promise<Province> {
        try {
            const provinceOrm = plainToInstance(ProvinceOrmEntity, province);
            const newProvince = await this.repo.save(provinceOrm);
            return newProvince;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<Province>): Promise<Province> {
        try {
            await this.repo.update(id, data);
            const updatedProvince = await this.repo.findOne({ where: { id } });
            return updatedProvince!;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id) .then(() => true).catch(() => false);
            
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Province | null> {
        try {
            const province = await this.repo.findOne({ where: { id } });
            return province || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKode(kode: string): Promise<Province | null> {
        try {
            const province = await this.repo.findOne({ where: { kode } }).catch((error) => {
                console.error('Error finding province by kode:', error);
                throw error;
            });
            return province || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetProvincesDto): Promise<{ data: Province[], total: number }> {
        try {
            const [provinces, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' }
            }).catch((error) => {
                console.error('Error fetching provinces:', error);
                throw error;
            });

            return { data: provinces, total };
        } catch (error) {
            throw error;
        }
    }
}
