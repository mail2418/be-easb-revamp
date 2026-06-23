import { JalanSaluranSpesifikasiSmkkReview } from './jalan_saluran_spesifikasi_smkk_review.entity';
import { CreateJalanSaluranSpesifikasiSmkkReviewDto } from '../../presentation/jalan_saluran_spesifikasi_smkk_review/dto/create_jalan_saluran_spesifikasi_smkk_review.dto';

export abstract class JalanSaluranSpesifikasiSmkkReviewRepository {
    abstract create(
        dto: CreateJalanSaluranSpesifikasiSmkkReviewDto,
    ): Promise<JalanSaluranSpesifikasiSmkkReview>;
    abstract deleteByUsulanJalanId(idUsulanJalan: number): Promise<void>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract deleteByUsulan(idUsulan: number, idJenisUsulan: number): Promise<void>;
    abstract findByUsulanJalan(
        idUsulanJalan: number,
        page?: number,
        amount?: number,
    ): Promise<[JalanSaluranSpesifikasiSmkkReview[], number]>;
    abstract findByUsulanSaluran(
        idUsulanSaluran: number,
        page?: number,
        amount?: number,
    ): Promise<[JalanSaluranSpesifikasiSmkkReview[], number]>;
    abstract findByUsulan(
        idUsulan: number,
        idJenisUsulan: number,
        page?: number,
        amount?: number,
    ): Promise<[JalanSaluranSpesifikasiSmkkReview[], number]>;
}
