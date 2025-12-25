import { CreateJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/create_jalan_spesifikasi_desain_review.dto";
import { GetJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/get_jalan_spesifikasi_desain_review.dto";
import { JalanSpesifikasiDesainReviewPaginationResultDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/jalan_spesifikasi_desain_review_pagination_result.dto";
import { UpdateJalanSpesifikasiDesainReviewDto } from "../../presentation/jalan_spesifikasi_desain_review/dto/update_jalan_spesifikasi_desain_review.dto";
import { JalanSpesifikasiDesainReview } from "./jalan_spesifikasi_desain_review.entity";

export abstract class JalanSpesifikasiDesainReviewService {
    abstract create(dto: CreateJalanSpesifikasiDesainReviewDto, lebar?: number): Promise<JalanSpesifikasiDesainReview>;
    abstract update(dto: UpdateJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReview>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanSpesifikasiDesainReview | null>;
    abstract findAll(dto: GetJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReviewPaginationResultDto>;
    abstract deleteByUsulanJalanId(idUsulanJalan: number): Promise<void>;
}
