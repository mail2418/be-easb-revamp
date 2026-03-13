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

    async create(
        dto: CreateAsbDetailReviewDto,
    ): Promise<AsbDetailReview> {
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

    async update(
        dto: UpdateAsbDetailReviewDto,
    ): Promise<AsbDetailReview> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbDetailReview with id ${dto.id} not found`,
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
                    `AsbDetailReview with id ${id} not found`,
                );
            }

            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<AsbDetailReview> {
        try {
            const detailReview = await this.repository.findById(id);
            if (!detailReview) {
                throw new NotFoundException(
                    `AsbDetailReview with id ${id} not found`,
                );
            }
            return detailReview;
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbDetailReviewByAsbDto): Promise<{ data: AsbDetailReview[], total: number, page: number, amount: number, totalPages: number }> {
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
            console.log(error);
            throw error;
        }
    }

    async getAsbDetailReviewWithRelation(idAsb: number): Promise<AsbDetailReviewWithRelationDto[]> {
        try {
            return await this.repository.getAsbDetailReviewWithRelation(idAsb);
        } catch (error) {
            throw error;
        }
    }
}
