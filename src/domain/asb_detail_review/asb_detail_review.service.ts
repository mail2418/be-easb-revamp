import { AsbDetailReview } from './asb_detail_review.entity';
import { CreateAsbDetailReviewDto } from '../../application/asb_detail_review/dto/create_asb_detail_review.dto';
import { UpdateAsbDetailReviewDto } from '../../application/asb_detail_review/dto/update_asb_detail_review.dto';
import { GetAsbDetailReviewByAsbDto } from '../../presentation/asb_detail_review/dto/get_asb_detail_review_by_asb.dto';
import { AsbDetailReviewWithRelationDto } from '../../application/asb_detail_review/dto/asb_detail_review_with_relation.dto';

export abstract class AsbDetailReviewService {
    abstract create(dto: CreateAsbDetailReviewDto): Promise<AsbDetailReview>;
    abstract update(dto: UpdateAsbDetailReviewDto): Promise<AsbDetailReview>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<AsbDetailReview>;
    abstract getByAsb(dto: GetAsbDetailReviewByAsbDto): Promise<{ data: AsbDetailReview[], total: number, page: number, amount: number, totalPages: number }>;
    abstract getAsbDetailReviewWithRelation(idAsb: number): Promise<AsbDetailReviewWithRelationDto[]>;
    abstract deleteByAsbId(idAsb: number): Promise<void>;
    abstract calculateKoefLantaiTotal(idAsb: number, luasTotal: number): Promise<number>;
    abstract calculateKoefFungsiRuangTotal(idAsb: number, luasTotal: number): Promise<number>;
}
