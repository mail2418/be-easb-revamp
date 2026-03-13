import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbKomponenBangunanProsStdService } from '../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.service';
import { AsbKomponenBangunanProsStdRepository } from '../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.repository';
import { AsbKomponenBangunanProsStd } from '../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.entity';
import { CreateAsbKomponenBangunanProsStdDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/create_asb_komponen_bangunan_pros_std.dto';
import { UpdateAsbKomponenBangunanProsStdDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/update_asb_komponen_bangunan_pros_std.dto';
import { DeleteAsbKomponenBangunanProsStdDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/delete_asb_komponen_bangunan_pros_std.dto';
import { GetAsbKomponenBangunanProsStdListDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/get_asb_komponen_bangunan_pros_std_list.dto';
import { GetAsbKomponenBangunanProsStdDetailDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/get_asb_komponen_bangunan_pros_std_detail.dto';
import { AsbKomponenBangunanProsStdPaginationResult } from '../../presentation/asb_komponen_bangunan_pros_std/dto/asb_komponen_bangunan_pros_std_pagination_result.dto';
import { ValidateStatisticalRangeUseCase } from './use_cases/validate_statistical_range.use_case';

@Injectable()
export class AsbKomponenBangunanProsStdServiceImpl implements AsbKomponenBangunanProsStdService {
    constructor(
        private readonly repository: AsbKomponenBangunanProsStdRepository,
        private readonly validateStatisticalRangeUseCase: ValidateStatisticalRangeUseCase
    ) { }

    async create(dto: CreateAsbKomponenBangunanProsStdDto): Promise<AsbKomponenBangunanProsStd> {
        try {
            this.validateStatisticalRangeUseCase.execute(dto.min || 0, dto.avgMin || 0, dto.avg || 0, dto.avgMax || 0, dto.max || 0);
            const entity = await this.repository.create(dto);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbKomponenBangunanProsStdDto): Promise<AsbKomponenBangunanProsStd> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanProsStd with id ${dto.id} not found`);
            }

            // Prepare updated values (use existing if not provided)
            const newMin = dto.min !== undefined ? dto.min : existing.min;
            const newAvgMin = dto.avgMin !== undefined ? dto.avgMin : existing.avgMin;
            const newAvg = dto.avg !== undefined ? dto.avg : existing.avg;
            const newAvgMax = dto.avgMax !== undefined ? dto.avgMax : existing.avgMax;
            const newMax = dto.max !== undefined ? dto.max : existing.max;

            this.validateStatisticalRangeUseCase.execute(newMin, newAvgMin, newAvg, newAvgMax, newMax);

            const updateData: Partial<AsbKomponenBangunanProsStd> = {
                idAsbKomponenBangunanStd: dto.idAsbKomponenBangunanStd,
                min: dto.min,
                avgMin: dto.avgMin,
                avg: dto.avg,
                avgMax: dto.avgMax,
                max: dto.max,
            };

            // Remove undefined values
            Object.keys(updateData).forEach(key => {
                if (updateData[key as keyof typeof updateData] === undefined) {
                    delete updateData[key as keyof typeof updateData];
                }
            });

            const updated = await this.repository.update(dto.id, updateData);
            return updated;
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteAsbKomponenBangunanProsStdDto): Promise<boolean> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanProsStd with id ${dto.id} not found`);
            }
            return await this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getAll(pagination: GetAsbKomponenBangunanProsStdListDto): Promise<AsbKomponenBangunanProsStdPaginationResult> {
        try {
            const result = await this.repository.findAll(pagination);
            return {
                komponenBangunanProsList: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getDetail(dto: GetAsbKomponenBangunanProsStdDetailDto): Promise<AsbKomponenBangunanProsStd> {
        try {
            const entity = await this.repository.findById(dto.id);
            if (!entity) {
                throw new NotFoundException(`AsbKomponenBangunanProsStd with id ${dto.id} not found`);
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponenBangunanStdId(id: number): Promise<AsbKomponenBangunanProsStd | null> {
        try {
            return await this.repository.findByKomponenBangunanStdId(id);
        } catch (error) {
            throw error;
        }
    }
}
