import { SmkkGlobal } from '../../../domain/smkk_global/smkk_global.entity';

export class SmkkGlobalPaginationResultDto {
    data!: SmkkGlobal[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
