import { CreateJalanRuangLingkupDto } from "../../presentation/jalan_ruang_lingkup/dto/create_jalan_ruang_lingkup.dto";
import { GetJalanRuangLingkupDto } from "../../presentation/jalan_ruang_lingkup/dto/get_jalan_ruang_lingkup.dto";
import { UpdateJalanRuangLingkupDto } from "../../presentation/jalan_ruang_lingkup/dto/update_jalan_ruang_lingkup.dto";
import { JalanRuangLingkup } from "./jalan_ruang_lingkup.entity";

export abstract class JalanRuangLingkupRepository {
    abstract create(dto: CreateJalanRuangLingkupDto): Promise<JalanRuangLingkup>;
    abstract update(dto: UpdateJalanRuangLingkupDto): Promise<JalanRuangLingkup>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanRuangLingkup | null>;
    abstract findByRuangLingkup(ruangLingkup: string): Promise<JalanRuangLingkup | null>;
    abstract findAll(dto: GetJalanRuangLingkupDto): Promise<{ data: JalanRuangLingkup[]; total: number }>;
}
