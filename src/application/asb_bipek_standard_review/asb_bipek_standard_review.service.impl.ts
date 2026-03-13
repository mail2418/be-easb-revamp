import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbBipekStandardReview } from '../../domain/asb_bipek_standard_review/asb_bipek_standard_review.entity';
import { AsbBipekStandardReviewService } from '../../domain/asb_bipek_standard_review/asb_bipek_standard_review.service';
import { AsbBipekStandardReviewRepository } from '../../domain/asb_bipek_standard_review/asb_bipek_standard_review.repository';
import { CreateAsbBipekStandardReviewDto } from './dto/create_asb_bipek_standard_review.dto';
import { UpdateAsbBipekStandardReviewDto } from './dto/update_asb_bipek_standard_review.dto';
import { GetAsbBipekStandardReviewByAsbDto } from '../../presentation/asb_bipek_standard_review/dto/get_asb_bipek_standard_review_by_asb.dto';
import { BpsReviewWithRelationsDto } from './dto/bps_review_with_relations.dto';

@Injectable()
export class AsbBipekStandardReviewServiceImpl extends AsbBipekStandardReviewService {
    constructor(
        private readonly repository: AsbBipekStandardReviewRepository,
    ) {
        super();
    }

    async create(
        dto: CreateAsbBipekStandardReviewDto,
    ): Promise<AsbBipekStandardReview> {
        try {
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(
        dto: UpdateAsbBipekStandardReviewDto,
    ): Promise<AsbBipekStandardReview> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBipekStandardReview with id ${dto.id} not found`,
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
                    `AsbBipekStandardReview with id ${id} not found`,
                );
            }

            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<AsbBipekStandardReview> {
        try {
            const bipekStandardReview = await this.repository.findById(id);
            if (!bipekStandardReview) {
                throw new NotFoundException(
                    `AsbBipekStandardReview with id ${id} not found`,
                );
            }
            return bipekStandardReview;
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbBipekStandardReviewByAsbDto): Promise<{ data: AsbBipekStandardReview[], total: number, page: number, amount: number, totalPages: number }> {
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

    async getBpsWithRelationByAsb(dto: GetAsbBipekStandardReviewByAsbDto): Promise<{ data: BpsReviewWithRelationsDto[], total: number, page: number, amount: number, totalPages: number }> {
        try {
            const [data, total] = await this.repository.getBpsWithRelationByAsb({ idAsb: dto.idAsb, page: dto.page, amount: dto.amount });
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
}
