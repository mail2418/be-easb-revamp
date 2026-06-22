import { GetJalanSaluranSpesifikasiSmkkReviewByUsulanJalanDto } from "../../presentation/jalan_saluran_spesifikasi_smkk_review/dto/get_jalan_saluran_spesifikasi_smkk_review_by_usulan_jalan.dto";
import { JalanSaluranSpesifikasiSmkkReview } from "./jalan_saluran_spesifikasi_smkk_review.entity";
import { CreateJalanSaluranSpesifikasiSmkkReviewDto } from "../../presentation/jalan_saluran_spesifikasi_smkk_review/dto/create_jalan_saluran_spesifikasi_smkk_review.dto";

export abstract class JalanSaluranSpesifikasiSmkkReviewService {
    abstract create(dto: CreateJalanSaluranSpesifikasiSmkkReviewDto): Promise<JalanSaluranSpesifikasiSmkkReview>;
    abstract deleteByUsulanJalanId(idUsulanJalan: number): Promise<void>;
    abstract getByUsulanJalan(dto: GetJalanSaluranSpesifikasiSmkkReviewByUsulanJalanDto): Promise<{ data: JalanSaluranSpesifikasiSmkkReview[]; total: number; page: number; amount: number; totalPages: number }>;
}

