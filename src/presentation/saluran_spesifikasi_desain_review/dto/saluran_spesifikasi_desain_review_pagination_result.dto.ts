import { SaluranSpesifikasiDesainReview } from '../../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.entity';

export class SaluranSpesifikasiDesainReviewPaginationResultDto {
    data!: SaluranSpesifikasiDesainReview[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
