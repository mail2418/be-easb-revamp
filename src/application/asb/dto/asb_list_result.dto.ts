import { AsbWithRelationsDto } from './asb_with_relations.dto';

export class AsbListResultDto {
    data: AsbWithRelationsDto[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
