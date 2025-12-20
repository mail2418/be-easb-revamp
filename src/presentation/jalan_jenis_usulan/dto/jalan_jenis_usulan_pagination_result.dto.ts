import { JalanJenisUsulan } from "../../../domain/jalan_jenis_usulan/jalan_jenis_usulan.entity";

export class JalanJenisUsulanPaginationResultDto {
    data!: JalanJenisUsulan[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
