import { Injectable, NotFoundException } from "@nestjs/common";
import { JalanSpesifikasiDesainReviewService } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service";
import { JalanSpesifikasiDesainReviewRepository } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.repository";
import { CreateJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/create_jalan_spesifikasi_desain_review.dto";
import { UpdateJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/update_jalan_spesifikasi_desain_review.dto";
import { GetJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/get_jalan_spesifikasi_desain_review.dto";
import { JalanSpesifikasiDesainReview } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.entity";
import { JalanSpesifikasiDesainReviewPaginationResultDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/jalan_spesifikasi_desain_review_pagination_result.dto";

@Injectable()
export class JalanSpesifikasiDesainReviewServiceImpl implements JalanSpesifikasiDesainReviewService {
    constructor(
        private readonly repository: JalanSpesifikasiDesainReviewRepository
    ) { }

    async create(dto: CreateJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReview> {
        try {
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReview> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanSpesifikasiDesainReview with ID ${dto.id} not found`);
            }
            return await this.repository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const exists = await this.repository.findById(id);
            if (!exists) {
                throw new NotFoundException(`JalanSpesifikasiDesainReview with ID ${id} not found`);
            }
            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSpesifikasiDesainReview | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReviewPaginationResultDto> {
        try {
            const result = await this.repository.findAll(dto);
            return {
                data: result.data,
                total: result.total,
                page: dto.page ?? 1,
                limit: dto.amount ?? result.total,
                totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1
            };
        } catch (error) {
            throw error;
        }
    }
}
