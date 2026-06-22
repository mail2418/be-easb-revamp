import { GetSaluranSpesifikasiSmkkReviewByUsulanSaluranDto } from "../../presentation/saluran_spesifikasi_smkk_review/dto/get_saluran_spesifikasi_smkk_review_by_usulan_saluran.dto";
import { SaluranSpesifikasiSmkkReview } from "./saluran_spesifikasi_smkk_review.entity";
import { CreateSaluranSpesifikasiSmkkReviewDto } from "../../presentation/saluran_spesifikasi_smkk_review/dto/create_saluran_spesifikasi_smkk_review.dto";

export abstract class SaluranSpesifikasiSmkkReviewService {
    abstract create(dto: CreateSaluranSpesifikasiSmkkReviewDto): Promise<SaluranSpesifikasiSmkkReview>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract getByUsulanSaluran(dto: GetSaluranSpesifikasiSmkkReviewByUsulanSaluranDto): Promise<{ data: SaluranSpesifikasiSmkkReview[]; total: number; page: number; amount: number; totalPages: number }>;
}
