import { AsbJakonWithRelationsDto } from '../../../application/asb_jakon/dto/asb_jakon_with_relations.dto';

export class AsbJakonPaginationResult {
    data: AsbJakonWithRelationsDto[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
