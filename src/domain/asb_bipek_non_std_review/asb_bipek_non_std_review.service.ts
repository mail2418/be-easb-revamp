import { AsbBipekNonStdReview } from './asb_bipek_non_std_review.entity';
import { CreateAsbBipekNonStdReviewDto } from '../../application/asb_bipek_non_std_review/dto/create_asb_bipek_non_std_review.dto';
import { UpdateAsbBipekNonStdReviewDto } from '../../application/asb_bipek_non_std_review/dto/update_asb_bipek_non_std_review.dto';
import { GetAsbBipekNonStdReviewByAsbDto } from '../../presentation/asb_bipek_non_std_review/dto/get_asb_bipek_non_std_review_by_asb.dto';
import { BpnsReviewWithRelationsDto } from 'src/application/asb_bipek_non_std/dto/bpns_review_with_relations.dto';

export abstract class AsbBipekNonStdReviewService {
    abstract create(
        dto: CreateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview>;
    abstract update(
        dto: UpdateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<AsbBipekNonStdReview>;
    abstract getByAsb(dto: GetAsbBipekNonStdReviewByAsbDto): Promise<{ data: AsbBipekNonStdReview[], total: number, page: number, amount: number, totalPages: number }>;
    abstract getBpnsWithRelationByAsb(dto: GetAsbBipekNonStdReviewByAsbDto): Promise<{ data: BpnsReviewWithRelationsDto[], total: number, page: number, amount: number, totalPages: number }>;
    abstract deleteByAsbId(idAsb: number): Promise<void>;
}
