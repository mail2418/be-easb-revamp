import { Injectable } from '@nestjs/common';
import { SaluranSpesifikasiSmkkReviewService } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.service';
import { SaluranSpesifikasiSmkkReviewRepository } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.repository';
import { GetSaluranSpesifikasiSmkkReviewByUsulanSaluranDto } from '../../presentation/saluran_spesifikasi_smkk_review/dto/get_saluran_spesifikasi_smkk_review_by_usulan_saluran.dto';
import { SaluranSpesifikasiSmkkReview } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.entity';
import { CreateSaluranSpesifikasiSmkkReviewDto } from '../../presentation/saluran_spesifikasi_smkk_review/dto/create_saluran_spesifikasi_smkk_review.dto';

@Injectable()
export class SaluranSpesifikasiSmkkReviewServiceImpl implements SaluranSpesifikasiSmkkReviewService {
    constructor(
        private readonly repository: SaluranSpesifikasiSmkkReviewRepository,
    ) { }

    async create(dto: CreateSaluranSpesifikasiSmkkReviewDto): Promise<SaluranSpesifikasiSmkkReview> {
        return await this.repository.create(dto);
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.repository.deleteByUsulanSaluranId(idUsulanSaluran);
    }

    async getByUsulanSaluran(dto: GetSaluranSpesifikasiSmkkReviewByUsulanSaluranDto): Promise<{ data: SaluranSpesifikasiSmkkReview[]; total: number; page: number; amount: number; totalPages: number }> {
        const [data, total] = await this.repository.findByUsulanSaluran(dto.idUsulanSaluran, dto.page, dto.amount);
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
}
