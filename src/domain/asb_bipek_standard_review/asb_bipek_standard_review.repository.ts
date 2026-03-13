import { AsbBipekStandardReview } from './asb_bipek_standard_review.entity';
import { CreateAsbBipekStandardReviewDto } from '../../application/asb_bipek_standard_review/dto/create_asb_bipek_standard_review.dto';
import { UpdateAsbBipekStandardReviewDto } from '../../application/asb_bipek_standard_review/dto/update_asb_bipek_standard_review.dto';
import { BpsReviewWithRelationsDto } from 'src/application/asb_bipek_standard_review/dto/bps_review_with_relations.dto';
import { GetAsbBipekStandardReviewByAsbDto } from 'src/presentation/asb_bipek_standard_review/dto/get_asb_bipek_standard_review_by_asb.dto';

export abstract class AsbBipekStandardReviewRepository {
    abstract create(dto: CreateAsbBipekStandardReviewDto): Promise<AsbBipekStandardReview>;
    abstract update(dto: UpdateAsbBipekStandardReviewDto): Promise<AsbBipekStandardReview>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbBipekStandardReview | null>;
    abstract findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBipekStandardReview[], number]>;
    abstract getBpsWithRelationByAsb(dto: GetAsbBipekStandardReviewByAsbDto): Promise<[BpsReviewWithRelationsDto[], number]>;
}
