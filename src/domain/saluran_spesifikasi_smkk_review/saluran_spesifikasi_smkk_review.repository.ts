import { SaluranSpesifikasiSmkkReview } from './saluran_spesifikasi_smkk_review.entity';
import { CreateSaluranSpesifikasiSmkkReviewDto } from '../../presentation/saluran_spesifikasi_smkk_review/dto/create_saluran_spesifikasi_smkk_review.dto';

export abstract class SaluranSpesifikasiSmkkReviewRepository {
    abstract create(
        dto: CreateSaluranSpesifikasiSmkkReviewDto,
    ): Promise<SaluranSpesifikasiSmkkReview>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract findByUsulanSaluran(
        idUsulanSaluran: number,
        page?: number,
        amount?: number,
    ): Promise<[SaluranSpesifikasiSmkkReview[], number]>;
}
