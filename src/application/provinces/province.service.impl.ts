import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProvinceService } from '../../domain/provinces/province.service';
import { ProvinceRepository } from '../../domain/provinces/province.repository';
import { Province } from '../../domain/provinces/province.entity';
import { CreateProvinceDto } from '../../presentation/provinces/dto/create_province.dto';
import { UpdateProvinceDto } from '../../presentation/provinces/dto/update_province.dto';
import { DeleteProvinceDto } from '../../presentation/provinces/dto/delete_province.dto';
import { GetProvincesDto } from '../../presentation/provinces/dto/get_provinces.dto';
import { GetProvinceDetailDto } from '../../presentation/provinces/dto/get_province_detail.dto';
import { ProvincesPaginationResult } from '../../presentation/provinces/dto/provinces_pagination_result.dto';
import e from 'express';

@Injectable()
export class ProvinceServiceImpl implements ProvinceService {
    constructor(private readonly provinceRepository: ProvinceRepository) {}

    async create(province: CreateProvinceDto): Promise<Province> {
        // Check if kode already exists
        const existingProvince = await this.provinceRepository.findByKode(province.kode);
        if (existingProvince) {
            throw new ConflictException(`Province with kode ${province.kode} already exists`);
        }

        const newProvince = await this.provinceRepository.create(province);
        return newProvince;
    }

    async updateProvince(province: UpdateProvinceDto): Promise<Province> {
        // Check if province exists
        const existingProvince = await this.provinceRepository.findById(province.id);
        if (!existingProvince) {
            throw new NotFoundException(`Province with id ${province.id} not found`);
        }

        // Check if kode is being changed and already exists
        if (province.kode && province.kode !== existingProvince.kode) {
            const kodeExists = await this.provinceRepository.findByKode(province.kode);
            if (kodeExists) {
                throw new ConflictException(`Province with kode ${province.kode} already exists`);
            }
        }
        const updateData: Partial<Province> = {
            kode: province.kode,
            nama: province.nama,
            isActive: province.isActive,
        };

        // Remove undefined values
        Object.keys(updateData).forEach(key => {
            if (updateData[key as keyof typeof updateData] === undefined) {
                delete updateData[key as keyof typeof updateData];
            }
        });

        const updatedProvince = await this.provinceRepository.update(province.id, updateData);
        return updatedProvince;
    }

    async deleteProvince(province: DeleteProvinceDto): Promise<boolean> {
        // Check if province exists
        const existingProvince = await this.provinceRepository.findById(province.id);
        if (!existingProvince) {
            throw new NotFoundException(`Province with id ${province.id} not found`);
        }

        const deleted = await this.provinceRepository.delete(province.id);
        return deleted;
    }

    async getProvinces(pagination: GetProvincesDto): Promise<ProvincesPaginationResult> {
        const result = await this.provinceRepository.findAll(pagination);
        return {
            provinces: result.data,
            total: result.total,
            page: pagination.page ?? 1,
            amount: pagination.amount ?? result.total,
            totalPages: pagination.amount ? Math.ceil(result.total / pagination.amount) : 1
        };
    }

    async getProvinceDetail(province: GetProvinceDetailDto): Promise<Province> {
        const existingProvince = await this.provinceRepository.findById(province.id);
        if (!existingProvince) {
            throw new NotFoundException(`Province with id ${province.id} not found`);
        }
        return existingProvince;
    }

    async findByKode(kode: string): Promise<Province | null> {
        return await this.provinceRepository.findByKode(kode);
    }

    async findById(id: number): Promise<Province | null> {
        return await this.provinceRepository.findById(id);
    }
}
