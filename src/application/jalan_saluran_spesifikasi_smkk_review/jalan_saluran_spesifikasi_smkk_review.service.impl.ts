import { Injectable } from '@nestjs/common';
import { JalanSaluranSpesifikasiSmkkReviewService } from '../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.service';
import { JalanSaluranSpesifikasiSmkkReviewRepository } from '../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.repository';
import { GetJalanSaluranSpesifikasiSmkkReviewByUsulanJalanDto } from '../../presentation/jalan_saluran_spesifikasi_smkk_review/dto/get_jalan_saluran_spesifikasi_smkk_review_by_usulan_jalan.dto';
import { JalanSaluranSpesifikasiSmkkReview } from '../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.entity';
import { CreateJalanSaluranSpesifikasiSmkkReviewDto } from '../../presentation/jalan_saluran_spesifikasi_smkk_review/dto/create_jalan_saluran_spesifikasi_smkk_review.dto';

@Injectable()
export class JalanSaluranSpesifikasiSmkkReviewServiceImpl
    implements JalanSaluranSpesifikasiSmkkReviewService
{
    constructor(private readonly repository: JalanSaluranSpesifikasiSmkkReviewRepository) {}

    async create(
        dto: CreateJalanSaluranSpesifikasiSmkkReviewDto,
    ): Promise<JalanSaluranSpesifikasiSmkkReview> {
        return await this.repository.create(dto);
    }

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        await this.repository.deleteByUsulanJalanId(idUsulanJalan);
    }

    async getByUsulanJalan(dto: GetJalanSaluranSpesifikasiSmkkReviewByUsulanJalanDto): Promise<{
        data: JalanSaluranSpesifikasiSmkkReview[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }> {
        const [data, total] = await this.repository.findByUsulanJalan(
            dto.idUsulanJalan,
            dto.page,
            dto.amount,
        );

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
}
