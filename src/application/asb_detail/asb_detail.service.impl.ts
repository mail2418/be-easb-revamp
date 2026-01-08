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
    }

    async update(dto: UpdateAsbDetailDto): Promise<AsbDetail> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(
                `AsbDetail with id ${dto.id} not found`,
            );
        }

        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<void> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundException(
                `AsbDetail with id ${id} not found`,
            );
        }

        await this.repository.delete(id);
    }

    async getById(id: number): Promise<AsbDetail> {
        const detail = await this.repository.findById(id);
        if (!detail) {
            throw new NotFoundException(
                `AsbDetail with id ${id} not found`,
            );
        }
        return detail;
    }

    async getByFileType(files: Files): Promise<AsbDetail[]> {
        return await this.repository.findByFileType(files);
    }

    async getByAsb(dto: GetAsbDetailByAsbDto): Promise<{ data: AsbDetail[], total: number, page: number, amount: number, totalPages: number }> {
        const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount);
        
        // If pagination is not provided, return all data with page=1, amount=total
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        
        return {
            data,
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1
        };
    }

    async getAsbDetailWithRelation(idAsb: number): Promise<AsbDetailWithRelationDto[]> {
        return await this.repository.getAsbDetailWithRelation(idAsb);
    }

    async deleteByIds(ids: number[]): Promise<void> {
        await this.repository.deleteByIds(ids);
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        await this.repository.deleteByAsbId(idAsb);
    }

    async calculateKoefLantaiTotal(idAsb: number, luasTotal: number): Promise<number> {
        // Get all details without pagination
        const [details] = await this.repository.findByAsb(idAsb);

        const totalKoefLantai = details.reduce((total, detail) => total + (detail.lantaiKoef || 0), 0);

        return Number((totalKoefLantai / luasTotal).toPrecision(3));
    }

    async calculateKoefFungsiRuangTotal(idAsb: number, luasTotal: number): Promise<number> {
        // Get all details without pagination
        const [details] = await this.repository.findByAsb(idAsb);
        const totalKoefFungsiRuang = details.reduce((total, detail) => total + (detail.asbFungsiRuangKoef || 0), 0);

        return Number((totalKoefFungsiRuang / luasTotal).toPrecision(3));
    }
}
