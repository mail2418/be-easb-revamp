import { JalanSaluranRuangLingkup } from "../../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.entity";

export class JalanSaluranRuangLingkupPaginationResultDto {
    data!: JalanSaluranRuangLingkup[];
    page!: number;
    amount!: number;
    total!: number;
    totalPages!: number;
}
