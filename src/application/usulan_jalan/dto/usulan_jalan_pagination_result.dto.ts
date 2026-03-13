import { UsulanJalan } from 'src/domain/usulan_jalan/usulan_jalan.entity';

export class UsulanJalanPaginationResultDto {
    data!: UsulanJalan[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}