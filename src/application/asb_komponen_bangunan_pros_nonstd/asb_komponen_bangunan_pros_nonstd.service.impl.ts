import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbKomponenBangunanProsNonstdService } from '../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.service';
import { AsbKomponenBangunanProsNonstdRepository } from '../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.repository';
import { AsbKomponenBangunanProsNonstd } from '../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.entity';
import { CreateAsbKomponenBangunanProsNonstdDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/create_asb_komponen_bangunan_pros_nonstd.dto';
import { UpdateAsbKomponenBangunanProsNonstdDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/update_asb_komponen_bangunan_pros_nonstd.dto';
import { DeleteAsbKomponenBangunanProsNonstdDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/delete_asb_komponen_bangunan_pros_nonstd.dto';
import { GetAsbKomponenBangunanProsNonstdListDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/get_asb_komponen_bangunan_pros_nonstd_list.dto';
import { GetAsbKomponenBangunanProsNonstdDetailDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/get_asb_komponen_bangunan_pros_nonstd_detail.dto';
import { AsbKomponenBangunanProsNonstdPaginationResult } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/asb_komponen_bangunan_pros_nonstd_pagination_result.dto';
import { ValidateStatisticalRangeUseCase } from '../asb_komponen_bangunan_pros_std/use_cases/validate_statistical_range.use_case';

@Injectable()
export class AsbKomponenBangunanProsNonstdServiceImpl implements AsbKomponenBangunanProsNonstdService {
    constructor(
        private readonly repository: AsbKomponenBangunanProsNonstdRepository,
        private readonly validateStatisticalRangeUseCase: ValidateStatisticalRangeUseCase
    ) { }

    async create(dto: CreateAsbKomponenBangunanProsNonstdDto): Promise<AsbKomponenBangunanProsNonstd> {
        try {
            this.validateStatisticalRangeUseCase.execute(dto.min || 0, dto.avgMin || 0, dto.avg || 0, dto.avgMax || 0, dto.max || 0);
            const entity = await this.repository.create(dto);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbKomponenBangunanProsNonstdDto): Promise<AsbKomponenBangunanProsNonstd> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanProsNonstd with id ${dto.id} not found`);
            }

            // Prepare updated values (use existing if not provided)
            const newMin = dto.min !== undefined ? dto.min : existing.min;
            const newAvgMin = dto.avgMin !== undefined ? dto.avgMin : existing.avgMin;
            const newAvg = dto.avg !== undefined ? dto.avg : existing.avg;
            const newAvgMax = dto.avgMax !== undefined ? dto.avgMax : existing.avgMax;
            const newMax = dto.max !== undefined ? dto.max : existing.max;

            this.validateStatisticalRangeUseCase.execute(newMin, newAvgMin, newAvg, newAvgMax, newMax);

            const updateData: Partial<AsbKomponenBangunanProsNonstd> = {
                idAsbKomponenBangunanNonstd: dto.idAsbKomponenBangunanNonstd,
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

    async delete(dto: DeleteAsbKomponenBangunanProsNonstdDto): Promise<boolean> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanProsNonstd with id ${dto.id} not found`);
            }
            return await this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getAll(pagination: GetAsbKomponenBangunanProsNonstdListDto): Promise<AsbKomponenBangunanProsNonstdPaginationResult> {
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

    async getDetail(dto: GetAsbKomponenBangunanProsNonstdDetailDto): Promise<AsbKomponenBangunanProsNonstd> {
        try {
            const entity = await this.repository.findById(dto.id);
            if (!entity) {
                throw new NotFoundException(`AsbKomponenBangunanProsNonstd with id ${dto.id} not found`);
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponenBangunanNonstdId(id: number): Promise<AsbKomponenBangunanProsNonstd | null> {
        try {
            return await this.repository.findByKomponenBangunanNonstdId(id);
        } catch (error) {
            throw error;
        }
    }
}
