import { Kecamatan } from '../../../domain/kecamatan/kecamatan.entity';

export class KecamatansPaginationResultDto {
    data: Kecamatan[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
