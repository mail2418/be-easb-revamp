import { UsulanJalanStatus } from '../../../domain/usulan_jalan_status/usulan_jalan_status.entity';

export class UsulanJalanStatusPaginationResultDto {
    data!: UsulanJalanStatus[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
