import { JalanTipePerkerasanLentur } from "../../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.entity";

export class JalanTipePerkerasanLenturPaginationResultDto {
    data!: JalanTipePerkerasanLentur[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
