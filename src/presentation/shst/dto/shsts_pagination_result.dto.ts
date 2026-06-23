import { ShstWithRelationsDto } from '../../../application/shst/dto/shst_with_relations.dto';

export class ShstsPaginationResultDto {
    data!: ShstWithRelationsDto[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}
