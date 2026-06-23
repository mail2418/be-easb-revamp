import { Hspk } from '../../../domain/hspk/hspk.entity';

export class HspkPaginationResultDto {
    data!: Hspk[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
