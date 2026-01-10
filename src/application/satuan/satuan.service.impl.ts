import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SatuanService } from '../../domain/satuan/satuan.service';
import { SatuanRepository } from '../../domain/satuan/satuan.repository';
import { Satuan } from '../../domain/satuan/satuan.entity';
import { CreateSatuanDto } from '../../presentation/satuan/dto/create_satuan.dto';
import { UpdateSatuanDto } from '../../presentation/satuan/dto/update_satuan.dto';
import { DeleteSatuanDto } from '../../presentation/satuan/dto/delete_satuan.dto';
import { GetSatuansDto } from '../../presentation/satuan/dto/get_satuans.dto';
import { GetSatuanDetailDto } from '../../presentation/satuan/dto/get_satuan_detail.dto';
import { SatuansPaginationResult } from '../../presentation/satuan/dto/satuans_pagination_result.dto';

@Injectable()
export class SatuanServiceImpl implements SatuanService {
    constructor(private readonly satuanRepository: SatuanRepository) {}

    async create(satuan: CreateSatuanDto): Promise<Satuan> {
        // Check if satuan already exists
        const existingSatuan = await this.satuanRepository.findBySatuan(satuan.satuan);
        if (existingSatuan) {
            throw new ConflictException(`Satuan with name ${satuan.satuan} already exists`);
        }

        const newSatuan = await this.satuanRepository.create(satuan);
        return newSatuan;
    }

    async updateSatuan(satuan: UpdateSatuanDto): Promise<Satuan> {
        // Check if satuan exists
        const existingSatuan = await this.satuanRepository.findById(satuan.id);
        if (!existingSatuan) {
            throw new NotFoundException(`Satuan with id ${satuan.id} not found`);
        }

        // Check if satuan name is being changed and already exists
        if (satuan.satuan && satuan.satuan !== existingSatuan.satuan) {
            const satuanExists = await this.satuanRepository.findBySatuan(satuan.satuan);
            if (satuanExists) {
                throw new ConflictException(`Satuan with name ${satuan.satuan} already exists`);
            }
        }

        const updateData: Partial<Satuan> = {
            satuan: satuan.satuan,
            isActive: satuan.isActive,
        };

        // Remove undefined values
        Object.keys(updateData).forEach(key => {
            if (updateData[key as keyof typeof updateData] === undefined) {
                delete updateData[key as keyof typeof updateData];
            }
        });

        const updatedSatuan = await this.satuanRepository.update(satuan.id, updateData);
        return updatedSatuan;
    }

    async deleteSatuan(satuan: DeleteSatuanDto): Promise<boolean> {
        // Check if satuan exists
        const existingSatuan = await this.satuanRepository.findById(satuan.id);
        if (!existingSatuan) {
            throw new NotFoundException(`Satuan with id ${satuan.id} not found`);
        }

        const deleted = await this.satuanRepository.delete(satuan.id);
        return deleted;
    }

    async getSatuans(pagination: GetSatuansDto): Promise<SatuansPaginationResult> {
        const page = pagination.page ?? 1;
        const amount = pagination.amount ?? 10;
        const paginationData = { page, amount };
        const result = await this.satuanRepository.findAll(paginationData);
        return {
            satuans: result.data,
            total: result.total,
            page,
            amount,
            totalPages: Math.ceil(result.total / amount)
        };
    }

    async getSatuanDetail(satuan: GetSatuanDetailDto): Promise<Satuan> {
        const existingSatuan = await this.satuanRepository.findById(satuan.id);
        if (!existingSatuan) {
            throw new NotFoundException(`Satuan with id ${satuan.id} not found`);
        }
        return existingSatuan;
    }

    async findBySatuan(satuan: string): Promise<Satuan | null> {
        return await this.satuanRepository.findBySatuan(satuan);
    }

    async findById(id: number): Promise<Satuan | null> {
        return await this.satuanRepository.findById(id);
    }
}
