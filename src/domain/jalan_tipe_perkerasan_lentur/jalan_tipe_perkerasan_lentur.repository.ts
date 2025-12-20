import { CreateJalanTipePerkerasanLenturDto } from "../../presentation/jalan_tipe_perkerasan_lentur/dto/create_jalan_tipe_perkerasan_lentur.dto";
import { JalanTipePerkerasanLentur } from "./jalan_tipe_perkerasan_lentur.entity";
import { UpdateJalanTipePerkerasanLenturDto } from "../../presentation/jalan_tipe_perkerasan_lentur/dto/update_jalan_tipe_perkerasan_lentur.dto";
import { GetJalanTipePerkerasanLenturDto } from "../../presentation/jalan_tipe_perkerasan_lentur/dto/get_jalan_tipe_perkerasan_lentur.dto";

export abstract class JalanTipePerkerasanLenturRepository {
    abstract create(dto: CreateJalanTipePerkerasanLenturDto): Promise<JalanTipePerkerasanLentur>;
    abstract update(dto: UpdateJalanTipePerkerasanLenturDto): Promise<JalanTipePerkerasanLentur>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanTipePerkerasanLentur | null>;
    abstract findByTipe(tipe: string): Promise<JalanTipePerkerasanLentur | null>;
    abstract findAll(dto: GetJalanTipePerkerasanLenturDto): Promise<{ data: JalanTipePerkerasanLentur[], total: number }>;
}
