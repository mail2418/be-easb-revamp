import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbDetail } from '../../domain/asb_detail/asb_detail.entity';
import { AsbDetailService } from '../../domain/asb_detail/asb_detail.service';
import { AsbDetailRepository } from '../../domain/asb_detail/asb_detail.repository';
import { Files } from '../../domain/asb_detail/files.enum';
import { CreateAsbDetailDto } from './dto/create_asb_detail.dto';
import { UpdateAsbDetailDto } from './dto/update_asb_detail.dto';
import { GetAsbDetailByAsbDto } from '../../presentation/asb_detail/dto/get_asb_detail_by_asb.dto';
import { CalculateKoefLantaiUseCase } from './use_cases/calculate_koef_lantai.use_case';
import { CalculateKoefFungsiBangunanUseCase } from './use_cases/calculate_koef_fungsi_bangunan.use_case';
import { AsbDetailWithRelationDto } from '../asb_detail/dto/asb_detail_with_relation.dto';

@Injectable()
export class AsbDetailServiceImpl extends AsbDetailService {
    constructor(
        private readonly repository: AsbDetailRepository,
        private readonly calculateKoefLantaiUseCase: CalculateKoefLantaiUseCase,
        private readonly calculateKoefFungsiBangunanUseCase: CalculateKoefFungsiBangunanUseCase,
    ) {
        super();
    }

    async create(dto: CreateAsbDetailDto): Promise<AsbDetail> {
        try {
            // Calculate lantai koef
            const lantaiKoef = await this.calculateKoefLantaiUseCase.execute(
                dto.luas,
                dto.idAsbLantai,
            );

            // Calculate fungsi bangunan koef
            const asbFungsiRuangKoef =
                await this.calculateKoefFungsiBangunanUseCase.execute(
                    dto.luas,
                    dto.idAsbFungsiRuang,
                );

            // Create with calculated coefficients
            dto.lantaiKoef = lantaiKoef;
            dto.asbFungsiRuangKoef = asbFungsiRuangKoef;
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbDetailDto): Promise<AsbDetail> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbDetail with id ${dto.id} not found`,
                );
            }

            return await this.repository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbDetail with id ${id} not found`,
                );
            }

            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<AsbDetail> {
        try {
            const detail = await this.repository.findById(id);
            if (!detail) {
                throw new NotFoundException(
                    `AsbDetail with id ${id} not found`,
                );
            }
            return detail;
        } catch (error) {
            throw error;
        }
    }

    async getByFileType(files: Files): Promise<AsbDetail[]> {
        try {
            return await this.repository.findByFileType(files);
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbDetailByAsbDto): Promise<{ data: AsbDetail[], total: number, page: number, amount: number, totalPages: number }> {
        try {
            const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount);
            return {
                data,
                total,
                page: dto.page,
                amount: dto.amount,
                totalPages: Math.ceil(total / dto.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getAsbDetailWithRelation(idAsb: number): Promise<AsbDetailWithRelationDto[]> {
        try {
            return await this.repository.getAsbDetailWithRelation(idAsb);
        } catch (error) {
            throw error;
        }
    }

    async deleteByIds(ids: number[]): Promise<void> {
        try {
            await this.repository.deleteByIds(ids);
        } catch (error) {
            throw error;
        }
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        try {
            console.log("Deleting ASB Detail by ASB ID: ", idAsb);
            await this.repository.deleteByAsbId(idAsb);
        } catch (error) {
            console.log("Error deleting ASB Detail by ASB ID: ", error);
            throw error;
        }
    }

    async calculateKoefLantaiTotal(idAsb: number, luasTotal: number): Promise<number> {
        try {
            const details = await this.repository.findByAsb(idAsb, 1, 100);

            const totalKoefLantai = details[0].reduce((total, detail) => total + (detail.lantaiKoef || 0), 0);

            return Number((totalKoefLantai / luasTotal).toPrecision(3));
        } catch (error) {
            throw error;
        }
    }

    async calculateKoefFungsiRuangTotal(idAsb: number, luasTotal: number): Promise<number> {
        try {
            const details = await this.repository.findByAsb(idAsb, 1, 100);
            const totalKoefFungsiRuang = details[0].reduce((total, detail) => total + (detail.asbFungsiRuangKoef || 0), 0);

            return Number((totalKoefFungsiRuang / luasTotal).toPrecision(3));
        } catch (error) {
            throw error;
        }
    }
}
