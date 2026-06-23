import { JalanSpesifikasiDesainReview } from '../../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.entity';

export class JalanSpesifikasiDesainReviewPaginationResultDto {
    data!: JalanSpesifikasiDesainReview[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
