import { PpnGlobal } from '../../../domain/ppn_global/ppn_global.entity';

export class PpnGlobalPaginationResultDto {
    data!: PpnGlobal[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
