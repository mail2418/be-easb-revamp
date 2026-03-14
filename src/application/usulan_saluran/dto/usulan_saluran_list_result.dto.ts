import { UsulanSaluranWithRelationsDto } from './usulan_saluran_with_relations.dto';

export class UsulanSaluranListResultDto {
    data!: UsulanSaluranWithRelationsDto[];
    page!: number;
    amount!: number;
    total!: number;
    totalPages!: number;
}
