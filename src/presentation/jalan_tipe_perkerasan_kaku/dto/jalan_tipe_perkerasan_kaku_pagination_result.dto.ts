import { JalanTipePerkerasanKaku } from "../../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.entity";

export class JalanTipePerkerasanKakuPaginationResultDto {
    data!: JalanTipePerkerasanKaku[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
