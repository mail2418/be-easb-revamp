import { JalanSaluranSmkk } from '../../../domain/jalan_saluran_smkk/jalan_saluran_smkk.entity';

export class JalanSaluranSmkkPaginationResultDto {
    data!: JalanSaluranSmkk[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
