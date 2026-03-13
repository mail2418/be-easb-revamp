import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AsbJakonService } from '../../domain/asb_jakon/asb_jakon.service';
import { AsbJakonRepository } from '../../domain/asb_jakon/asb_jakon.repository';
import { AsbJakon } from '../../domain/asb_jakon/asb_jakon.entity';
import { CreateAsbJakonDto } from '../../presentation/asb_jakon/dto/create_asb_jakon.dto';
import { UpdateAsbJakonDto } from '../../presentation/asb_jakon/dto/update_asb_jakon.dto';
import { DeleteAsbJakonDto } from '../../presentation/asb_jakon/dto/delete_asb_jakon.dto';
import { GetAsbJakonListDto } from '../../presentation/asb_jakon/dto/get_asb_jakon_list.dto';
import { GetAsbJakonDetailDto } from '../../presentation/asb_jakon/dto/get_asb_jakon_detail.dto';
import { ValidatePriceRangeUseCase } from './use_cases/validate_price_range.use_case';
import { GetAsbJakonListFilterDto } from '../../presentation/asb_jakon/dto/get_asb_jakon_list_filter.dto';
import { GetJakonByPriceRangeDto } from './dto/get_jakon_by_price_range.dto';
@Injectable()
export class AsbJakonServiceImpl implements AsbJakonService {
    constructor(
        private readonly repository: AsbJakonRepository,
        private readonly validatePriceRange: ValidatePriceRangeUseCase,
    ) { }

    async create(dto: CreateAsbJakonDto): Promise<AsbJakon> {
        try {
            this.validatePriceRange.execute(dto.priceFrom, dto.priceTo);
            return this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbJakonDto): Promise<AsbJakon> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbJakon with id ${dto.id} not found`);
            }
            const priceFrom = dto.priceFrom !== undefined ? dto.priceFrom : existing.priceFrom;
            const priceTo = dto.priceTo !== undefined ? dto.priceTo : existing.priceTo;
            this.validatePriceRange.execute(priceFrom, priceTo);
            const updateData: Partial<AsbJakon> = {
                idAsbTipeBangunan: dto.idAsbTipeBangunan,
                idAsbJenis: dto.idAsbJenis,
                idAsbKlasifikasi: dto.idAsbKlasifikasi,
                tahun: dto.tahun,
                type: dto.type,
                nama: dto.nama,
                spec: dto.spec,
                priceFrom: dto.priceFrom,
                priceTo: dto.priceTo,
                satuan: dto.satuan,
                standard: dto.standard,
            };
            // remove undefined
            Object.keys(updateData).forEach(k => {
                if (updateData[k as keyof typeof updateData] === undefined) {
                    delete updateData[k as keyof typeof updateData];
                }
            });
            return this.repository.update(dto.id, updateData);
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteAsbJakonDto): Promise<boolean> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbJakon with id ${dto.id} not found`);
            }
            return this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getAll(pagination: GetAsbJakonListDto): Promise<any> {
        try {
            const result = await this.repository.findAll(pagination);
            return {
                data: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount),
            };
        } catch (error) {
            throw error;
        }
    }

    async getDetail(dto: GetAsbJakonDetailDto): Promise<AsbJakon> {
        try {
            const entity = await this.repository.findById(dto.id);
            if (!entity) {
                throw new NotFoundException(`AsbJakon with id ${dto.id} not found`);
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findByAsbJenisId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.idAsbJenis) {
                throw new BadRequestException('idAsbJenis is required');
            }
            return await this.repository.findByAsbJenisId(dto.idAsbJenis);
        } catch (error) {
            throw error;
        }
    }

    async findByAsbTipeBangunanId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.idAsbTipeBangunan) {
                throw new BadRequestException('idAsbTipeBangunan is required');
            }
            return await this.repository.findByAsbTipeBangunanId(dto.idAsbTipeBangunan);
        } catch (error) {
            throw error;
        }
    }

    async findByAsbKlasifikasiId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.idAsbKlasifikasi) {
                throw new BadRequestException('idAsbKlasifikasi is required');
            }
            return await this.repository.findByAsbKlasifikasiId(dto.idAsbKlasifikasi);
        } catch (error) {
            throw error;
        }
    }

    async findByTahun(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.tahun) {
                throw new BadRequestException('tahun is required');
            }
            return await this.repository.findByTahun(dto.tahun);
        } catch (error) {
            throw error;
        }
    }

    async findByType(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]> {
        try {
            if (!dto.type) {
                throw new BadRequestException('type is required');
            }
            return await this.repository.findByType(dto.type);
        } catch (error) {
            throw error;
        }
    }

    async getJakonByPriceRange(dto: GetJakonByPriceRangeDto): Promise<AsbJakon | null> {
        try {
            const jakon = await this.repository.findByPriceRange(dto);
            return jakon;
        } catch (error) {
            throw error;
        }
    }
}
