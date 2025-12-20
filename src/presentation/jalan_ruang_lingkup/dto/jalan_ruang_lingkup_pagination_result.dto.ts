import { JalanRuangLingkup } from "../../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.entity";

export class JalanRuangLingkupPaginationResultDto {
    data!: JalanRuangLingkup[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
