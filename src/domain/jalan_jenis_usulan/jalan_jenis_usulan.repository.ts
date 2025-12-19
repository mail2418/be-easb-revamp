import { CreateJalanJenisUsulanDto } from "../../presentation/jalan_jenis_usulan/dto/create_jalan_jenis_usulan.dto";
import { JalanJenisUsulan } from "./jalan_jenis_usulan.entity";
import { UpdateJalanJenisUsulanDto } from "../../presentation/jalan_jenis_usulan/dto/update_jalan_jenis_usulan.dto";
import { GetJalanJenisUsulanDto } from "../../presentation/jalan_jenis_usulan/dto/get_jalan_jenis_usulan.dto";

export abstract class JalanJenisUsulanRepository {
    abstract create(dto: CreateJalanJenisUsulanDto): Promise<JalanJenisUsulan>;
    abstract update(dto: UpdateJalanJenisUsulanDto): Promise<JalanJenisUsulan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanJenisUsulan | null>;
    abstract findByJenisUsulan(jenisUsulan: string): Promise<JalanJenisUsulan | null>;
    abstract findAll(dto: GetJalanJenisUsulanDto): Promise<{ data: JalanJenisUsulan[], total: number }>;
}
