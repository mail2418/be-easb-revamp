import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbDetailReview } from '../../domain/asb_detail_review/asb_detail_review.entity';
import { AsbDetailReviewService } from '../../domain/asb_detail_review/asb_detail_review.service';
import { AsbDetailReviewRepository } from '../../domain/asb_detail_review/asb_detail_review.repository';
import { CreateAsbDetailReviewDto } from './dto/create_asb_detail_review.dto';
import { UpdateAsbDetailReviewDto } from './dto/update_asb_detail_review.dto';
import { GetAsbDetailReviewByAsbDto } from '../../presentation/asb_detail_review/dto/get_asb_detail_review_by_asb.dto';
import { CalculateKoefLantaiUseCase } from './use_cases/calculate_koef_lantai.use_case';
import { CalculateKoefFungsiBangunanUseCase } from './use_cases/calculate_koef_fungsi_bangunan.use_case';
import { AsbDetailReviewWithRelationDto } from './dto/asb_detail_review_with_relation.dto';

@Injectable()
export class AsbDetailReviewServiceImpl extends AsbDetailReviewService {
    constructor(
        private readonly repository: AsbDetailReviewRepository,
        private readonly calculateKoefLantaiUseCase: CalculateKoefLantaiUseCase,
        private readonly calculateKoefFungsiBangunanUseCase: CalculateKoefFungsiBangunanUseCase,
    ) {
        super();
    }

    async create(dto: CreateAsbDetailReviewDto): Promise<AsbDetailReview> {
        // Calculate lantai koef
        const lantaiKoef = await this.calculateKoefLantaiUseCase.execute(dto.luas, dto.idAsbLantai);

        // Calculate fungsi bangunan koef
        const asbFungsiRuangKoef = await this.calculateKoefFungsiBangunanUseCase.execute(
            dto.luas,
            dto.idAsbFungsiRuang,
        );

        // Create with calculated coefficients
        dto.lantaiKoef = lantaiKoef;
        dto.asbFungsiRuangKoef = asbFungsiRuangKoef;
        return await this.repository.create(dto);
    }

    async update(dto: UpdateAsbDetailReviewDto): Promise<AsbDetailReview> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`AsbDetailReview with id ${dto.id} not found`);
        }

        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<void> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundException(`AsbDetailReview with id ${id} not found`);
        }

        await this.repository.delete(id);
    }

    async getById(id: number): Promise<AsbDetailReview> {
        const detailReview = await this.repository.findById(id);
        if (!detailReview) {
            throw new NotFoundException(`AsbDetailReview with id ${id} not found`);
        }
        return detailReview;
    }

    async getByAsb(dto: GetAsbDetailReviewByAsbDto): Promise<{
        data: AsbDetailReview[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }> {
        const page = dto.page ?? 1;
        const amount = dto.amount ?? 10;
        const [data, total] = await this.repository.findByAsb(dto.idAsb, page, amount);
        return {
            data,
            total,
            page,
            amount,
            totalPages: Math.ceil(total / amount),
        };
    }

    async getAsbDetailReviewWithRelation(idAsb: number): Promise<AsbDetailReviewWithRelationDto[]> {
        return await this.repository.getAsbDetailReviewWithRelation(idAsb);
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        await this.repository.deleteByAsbId(idAsb);
    }

    async calculateKoefLantaiTotal(idAsb: number, luasTotal: number): Promise<number> {
        const details = await this.repository.findByAsb(idAsb, 1, 100);

        const totalKoefLantai = details[0].reduce(
            (total, detail) => total + (detail.lantaiKoef || 0),
            0,
        );

        return Number((totalKoefLantai / luasTotal).toPrecision(3));
    }

    async calculateKoefFungsiRuangTotal(idAsb: number, luasTotal: number): Promise<number> {
        const details = await this.repository.findByAsb(idAsb, 1, 100);
        const totalKoefFungsiRuang = details[0].reduce(
            (total, detail) => total + (detail.asbFungsiRuangKoef || 0),
            0,
        );

        return Number((totalKoefFungsiRuang / luasTotal).toPrecision(3));
    }
}
