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
        return await this.repository.create(dto);
    }

    async update(
        dto: UpdateAsbBipekStandardReviewDto,
    ): Promise<AsbBipekStandardReview> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(
                `AsbBipekStandardReview with id ${dto.id} not found`,
            );
        }

        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<void> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundException(
                `AsbBipekStandardReview with id ${id} not found`,
            );
        }

        await this.repository.delete(id);
    }

    async getById(id: number): Promise<AsbBipekStandardReview> {
        const bipekStandardReview = await this.repository.findById(id);
        if (!bipekStandardReview) {
            throw new NotFoundException(
                `AsbBipekStandardReview with id ${id} not found`,
            );
        }
        return bipekStandardReview;
    }

    async getByAsb(dto: GetAsbBipekStandardReviewByAsbDto): Promise<{ data: AsbBipekStandardReview[], total: number, page: number, amount: number, totalPages: number }> {
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

    async getBpsWithRelationByAsb(dto: GetAsbBipekStandardReviewByAsbDto): Promise<{ data: BpsReviewWithRelationsDto[], total: number, page: number, amount: number, totalPages: number }> {
        const [data, total] = await this.repository.getBpsWithRelationByAsb({ idAsb: dto.idAsb, page: dto.page, amount: dto.amount });
        
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

    async deleteByAsbId(idAsb: number): Promise<void> {
        await this.repository.deleteByAsbId(idAsb);
    }
}
