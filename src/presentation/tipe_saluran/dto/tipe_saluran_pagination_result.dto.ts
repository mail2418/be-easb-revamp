import { TipeSaluran } from "../../../domain/tipe_saluran/tipe_saluran.entity";

export class TipeSaluranPaginationResultDto {
    data!: TipeSaluran[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
