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
    constructor(
        @InjectRepository(ProvinceOrmEntity) private readonly repo: Repository<ProvinceOrmEntity>,
    ) {}

    async create(province: CreateProvinceDto): Promise<Province> {
        const provinceOrm = plainToInstance(ProvinceOrmEntity, province);
        const newProvince = await this.repo.save(provinceOrm);
        return newProvince;
    }

    async update(id: number, data: Partial<Province>): Promise<Province> {
        await this.repo.update(id, data);
        const updatedProvince = await this.repo.findOne({ where: { id } });
        return updatedProvince!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo
            .softDelete(id)
            .then(() => true)
            .catch(() => false);
    }

    async findById(id: number): Promise<Province | null> {
        const province = await this.repo.findOne({ where: { id } });
        return province || null;
    }

    async findByKode(kode: string): Promise<Province | null> {
        const province = await this.repo.findOne({ where: { kode } });
        return province || null;
    }

    async findAll(pagination: GetProvincesDto): Promise<{ data: Province[]; total: number }> {
        const findOptions: any = {
            order: { id: 'DESC' },
        };

        if (pagination.page !== undefined && pagination.amount !== undefined) {
            findOptions.skip = (pagination.page - 1) * pagination.amount;
            findOptions.take = pagination.amount;
        }

        const [provinces, total] = await this.repo.findAndCount(findOptions);

        return { data: provinces, total };
    }
}
