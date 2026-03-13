import { AsbDetailReview } from './asb_detail_review.entity';
import { CreateAsbDetailReviewDto } from '../../application/asb_detail_review/dto/create_asb_detail_review.dto';
import { UpdateAsbDetailReviewDto } from '../../application/asb_detail_review/dto/update_asb_detail_review.dto';
import { AsbDetailReviewWithRelationDto } from 'src/application/asb_detail_review/dto/asb_detail_review_with_relation.dto';

export abstract class AsbDetailReviewRepository {
    abstract create(dto: CreateAsbDetailReviewDto): Promise<AsbDetailReview>;
    abstract update(dto: UpdateAsbDetailReviewDto): Promise<AsbDetailReview>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbDetailReview | null>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbDetailReview[], number]>;
    abstract getAsbDetailReviewWithRelation(idAsb: number): Promise<AsbDetailReviewWithRelationDto[]>;
}
