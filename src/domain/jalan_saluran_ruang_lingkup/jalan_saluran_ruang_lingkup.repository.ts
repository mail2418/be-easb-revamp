import { CreateJalanSaluranRuangLingkupDto } from "../../presentation/jalan_saluran_ruang_lingkup/dto/create_jalan_saluran_ruang_lingkup.dto";
import { UpdateJalanSaluranRuangLingkupDto } from "../../presentation/jalan_saluran_ruang_lingkup/dto/update_jalan_saluran_ruang_lingkup.dto";
import { GetJalanSaluranRuangLingkupDto } from "../../presentation/jalan_saluran_ruang_lingkup/dto/get_jalan_saluran_ruang_lingkup.dto";
import { JalanSaluranRuangLingkup } from "./jalan_saluran_ruang_lingkup.entity";

export abstract class JalanSaluranRuangLingkupRepository {
    abstract create(dto: CreateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup>;
    abstract update(dto: UpdateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanSaluranRuangLingkup | null>;
    abstract findByJenisUsulanAndDivisi(idJenisUsulan: number, nomorDivisi: number): Promise<JalanSaluranRuangLingkup | null>;
    abstract findAll(dto: GetJalanSaluranRuangLingkupDto): Promise<{ data: JalanSaluranRuangLingkup[]; total: number }>;
}
