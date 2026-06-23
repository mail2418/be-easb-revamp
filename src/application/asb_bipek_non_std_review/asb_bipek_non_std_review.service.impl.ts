import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbBipekNonStdReview } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.entity';
import { AsbBipekNonStdReviewService } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.service';
import { AsbBipekNonStdReviewRepository } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.repository';
import { CreateAsbBipekNonStdReviewDto } from './dto/create_asb_bipek_non_std_review.dto';
import { UpdateAsbBipekNonStdReviewDto } from './dto/update_asb_bipek_non_std_review.dto';
import { GetAsbBipekNonStdReviewByAsbDto } from '../../presentation/asb_bipek_non_std_review/dto/get_asb_bipek_non_std_review_by_asb.dto';
import { BpnsReviewWithRelationsDto } from '../asb_bipek_non_std/dto/bpns_review_with_relations.dto';

@Injectable()
export class AsbBipekNonStdReviewServiceImpl extends AsbBipekNonStdReviewService {
    constructor(private readonly repository: AsbBipekNonStdReviewRepository) {
        super();
    }

    async create(dto: CreateAsbBipekNonStdReviewDto): Promise<AsbBipekNonStdReview> {
        return await this.repository.create(dto);
    }

    async update(dto: UpdateAsbBipekNonStdReviewDto): Promise<AsbBipekNonStdReview> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`AsbBipekNonStdReview with id ${dto.id} not found`);
        }

        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<void> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundException(`AsbBipekNonStdReview with id ${id} not found`);
        }

        await this.repository.delete(id);
    }

    async getById(id: number): Promise<AsbBipekNonStdReview> {
        const bipekNonStdReview = await this.repository.findById(id);
        if (!bipekNonStdReview) {
            throw new NotFoundException(`AsbBipekNonStdReview with id ${id} not found`);
        }
        return bipekNonStdReview;
    }

    async getByAsb(dto: GetAsbBipekNonStdReviewByAsbDto): Promise<{
        data: AsbBipekNonStdReview[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }> {
        const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount);

        // If pagination is not provided, return all data with page=1, amount=total
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;

        return {
            data,
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1,
        };
    }

    async getBpnsWithRelationByAsb(dto: GetAsbBipekNonStdReviewByAsbDto): Promise<{
        data: BpnsReviewWithRelationsDto[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }> {
        const [data, total] = await this.repository.getBpnsWithRelationByAsb({
            idAsb: dto.idAsb,
            page: dto.page,
            amount: dto.amount,
        });

        // If pagination is not provided, return all data with page=1, amount=total
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;

        return {
            data,
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1,
        };
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        await this.repository.deleteByAsbId(idAsb);
    }
}
