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
        try {
            // Check if satuan already exists
            const existingSatuan = await this.satuanRepository.findBySatuan(satuan.satuan);
            if (existingSatuan) {
                throw new ConflictException(`Satuan with name ${satuan.satuan} already exists`);
            }

            const newSatuan = await this.satuanRepository.create(satuan);
            return newSatuan;
        } catch (error) {
            throw error;
        }
    }

    async updateSatuan(satuan: UpdateSatuanDto): Promise<Satuan> {
        try {
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
        } catch (error) {
            throw error;
        }
    }

    async deleteSatuan(satuan: DeleteSatuanDto): Promise<boolean> {
        try {
            // Check if satuan exists
            const existingSatuan = await this.satuanRepository.findById(satuan.id);
            if (!existingSatuan) {
                throw new NotFoundException(`Satuan with id ${satuan.id} not found`);
            }

            const deleted = await this.satuanRepository.delete(satuan.id);
            return deleted;
        } catch (error) {
            throw error;
        }
    }

    async getSatuans(pagination: GetSatuansDto): Promise<SatuansPaginationResult> {
        try {
            const result = await this.satuanRepository.findAll(pagination);
            return {
                satuans: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getSatuanDetail(satuan: GetSatuanDetailDto): Promise<Satuan> {
        try {
            const existingSatuan = await this.satuanRepository.findById(satuan.id);
            if (!existingSatuan) {
                throw new NotFoundException(`Satuan with id ${satuan.id} not found`);
            }
            return existingSatuan;
        } catch (error) {
            throw error;
        }
    }

    async findBySatuan(satuan: string): Promise<Satuan | null> {
        try {
            return await this.satuanRepository.findBySatuan(satuan);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Satuan | null> {
        try {
            return await this.satuanRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }
}
