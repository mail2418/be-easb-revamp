import { JalanJenisPerkerasan } from "../../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.entity";

export class JalanJenisPerkerasanPaginationResultDto {
    data!: JalanJenisPerkerasan[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
