import { CreateSaluranSpesifikasiDesainReviewDto } from "../../presentation/saluran_spesifikasi_desain_review/dto/create_saluran_spesifikasi_desain_review.dto";
import { GetSaluranSpesifikasiDesainReviewDto } from "../../presentation/saluran_spesifikasi_desain_review/dto/get_saluran_spesifikasi_desain_review.dto";
import { UpdateSaluranSpesifikasiDesainReviewDto } from "../../presentation/saluran_spesifikasi_desain_review/dto/update_saluran_spesifikasi_desain_review.dto";
import { SaluranSpesifikasiDesainReview } from "./saluran_spesifikasi_desain_review.entity";

export abstract class SaluranSpesifikasiDesainReviewRepository {
    abstract create(dto: CreateSaluranSpesifikasiDesainReviewDto): Promise<SaluranSpesifikasiDesainReview>;
    abstract update(dto: UpdateSaluranSpesifikasiDesainReviewDto): Promise<SaluranSpesifikasiDesainReview>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<SaluranSpesifikasiDesainReview | null>;
    abstract findAll(dto: GetSaluranSpesifikasiDesainReviewDto): Promise<{ data: SaluranSpesifikasiDesainReview[]; total: number }>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract findByUsulanSaluran(idUsulanSaluran: number, page?: number, amount?: number): Promise<[SaluranSpesifikasiDesainReview[], number]>;
}
