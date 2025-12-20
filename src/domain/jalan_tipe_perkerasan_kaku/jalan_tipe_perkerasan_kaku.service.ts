import { CreateJalanTipePerkerasanKakuDto } from "../../presentation/jalan_tipe_perkerasan_kaku/dto/create_jalan_tipe_perkerasan_kaku.dto";
import { JalanTipePerkerasanKaku } from "./jalan_tipe_perkerasan_kaku.entity";
import { UpdateJalanTipePerkerasanKakuDto } from "../../presentation/jalan_tipe_perkerasan_kaku/dto/update_jalan_tipe_perkerasan_kaku.dto";
import { GetJalanTipePerkerasanKakuDto } from "../../presentation/jalan_tipe_perkerasan_kaku/dto/get_jalan_tipe_perkerasan_kaku.dto";
import { JalanTipePerkerasanKakuPaginationResultDto } from "../../presentation/jalan_tipe_perkerasan_kaku/dto/jalan_tipe_perkerasan_kaku_pagination_result.dto";

export abstract class JalanTipePerkerasanKakuService {
    abstract create(dto: CreateJalanTipePerkerasanKakuDto): Promise<JalanTipePerkerasanKaku>;
    abstract update(dto: UpdateJalanTipePerkerasanKakuDto): Promise<JalanTipePerkerasanKaku>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanTipePerkerasanKaku | null>;
    abstract findByTipe(tipe: string): Promise<JalanTipePerkerasanKaku | null>;
    abstract findAll(dto: GetJalanTipePerkerasanKakuDto): Promise<JalanTipePerkerasanKakuPaginationResultDto>;
}
