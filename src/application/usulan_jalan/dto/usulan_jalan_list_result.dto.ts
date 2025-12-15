import { UsulanJalanWithRelationsDto } from './usulan_jalan_with_relations.dto';

export class UsulanJalanListResultDto {
    data!: UsulanJalanWithRelationsDto[];
    page!: number;
    amount!: number;
    total!: number;
    totalPages!: number;
}


