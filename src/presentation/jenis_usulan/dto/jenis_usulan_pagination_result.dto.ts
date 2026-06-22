import { JenisUsulan } from "../../../domain/jenis_usulan/jenis_usulan.entity";

export class JenisUsulanPaginationResultDto {
    data!: JenisUsulan[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
