import { StandardKlasifikasi } from '../../../domain/standard_klasifikasi/standard_klasifikasi.entity';

export class StandardKlasifikasisPaginationResultDto {
    data: StandardKlasifikasi[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
