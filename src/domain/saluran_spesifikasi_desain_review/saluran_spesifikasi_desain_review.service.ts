import { CreateSaluranSpesifikasiDesainReviewDto } from "../../presentation/saluran_spesifikasi_desain_review/dto/create_saluran_spesifikasi_desain_review.dto";
import { GetSaluranSpesifikasiDesainReviewDto } from "../../presentation/saluran_spesifikasi_desain_review/dto/get_saluran_spesifikasi_desain_review.dto";
import { SaluranSpesifikasiDesainReviewPaginationResultDto } from "../../presentation/saluran_spesifikasi_desain_review/dto/saluran_spesifikasi_desain_review_pagination_result.dto";
import { UpdateSaluranSpesifikasiDesainReviewDto } from "../../presentation/saluran_spesifikasi_desain_review/dto/update_saluran_spesifikasi_desain_review.dto";
import { SaluranSpesifikasiDesainReview } from "./saluran_spesifikasi_desain_review.entity";
import { GetSaluranSpesifikasiDesainReviewByUsulanSaluranDto } from "../../presentation/saluran_spesifikasi_desain_review/dto/get_saluran_spesifikasi_desain_review_by_usulan_saluran.dto";

export abstract class SaluranSpesifikasiDesainReviewService {
    abstract create(dto: CreateSaluranSpesifikasiDesainReviewDto, lebar?: number): Promise<SaluranSpesifikasiDesainReview>;
    abstract update(dto: UpdateSaluranSpesifikasiDesainReviewDto): Promise<SaluranSpesifikasiDesainReview>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<SaluranSpesifikasiDesainReview | null>;
    abstract findAll(dto: GetSaluranSpesifikasiDesainReviewDto): Promise<SaluranSpesifikasiDesainReviewPaginationResultDto>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract getByUsulanSaluran(dto: GetSaluranSpesifikasiDesainReviewByUsulanSaluranDto): Promise<{ data: SaluranSpesifikasiDesainReview[]; total: number; page: number; amount: number; totalPages: number }>;
}
