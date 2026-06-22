import { AsbBipekStandardReview } from './asb_bipek_standard_review.entity';
import { CreateAsbBipekStandardReviewDto } from '../../application/asb_bipek_standard_review/dto/create_asb_bipek_standard_review.dto';
import { UpdateAsbBipekStandardReviewDto } from '../../application/asb_bipek_standard_review/dto/update_asb_bipek_standard_review.dto';
import { GetAsbBipekStandardReviewByAsbDto } from '../../presentation/asb_bipek_standard_review/dto/get_asb_bipek_standard_review_by_asb.dto';
import { BpsReviewWithRelationsDto } from '../../application/asb_bipek_standard_review/dto/bps_review_with_relations.dto';

export abstract class AsbBipekStandardReviewService {
    abstract create(dto: CreateAsbBipekStandardReviewDto): Promise<AsbBipekStandardReview>;
    abstract update(dto: UpdateAsbBipekStandardReviewDto): Promise<AsbBipekStandardReview>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<AsbBipekStandardReview>;
    abstract getByAsb(dto: GetAsbBipekStandardReviewByAsbDto): Promise<{ data: AsbBipekStandardReview[], total: number, page: number, amount: number, totalPages: number }>;
    abstract getBpsWithRelationByAsb(dto: GetAsbBipekStandardReviewByAsbDto): Promise<{ data: BpsReviewWithRelationsDto[], total: number, page: number, amount: number, totalPages: number }>;
    abstract deleteByAsbId(idAsb: number): Promise<void>;
}
