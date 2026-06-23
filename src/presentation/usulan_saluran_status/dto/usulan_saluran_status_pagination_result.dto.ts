import { UsulanSaluranStatus } from '../../../domain/usulan_saluran_status/usulan_saluran_status.entity';

export class UsulanSaluranStatusPaginationResultDto {
    data!: UsulanSaluranStatus[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
