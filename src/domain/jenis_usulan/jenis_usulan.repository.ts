import { CreateJenisUsulanDto } from "../../presentation/jenis_usulan/dto/create_jenis_usulan.dto";
import { UpdateJenisUsulanDto } from "../../presentation/jenis_usulan/dto/update_jenis_usulan.dto";
import { GetJenisUsulanDto } from "../../presentation/jenis_usulan/dto/get_jenis_usulan.dto";
import { JenisUsulan } from "./jenis_usulan.entity";

export abstract class JenisUsulanRepository {
    abstract create(dto: CreateJenisUsulanDto): Promise<JenisUsulan>;
    abstract update(dto: UpdateJenisUsulanDto): Promise<JenisUsulan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JenisUsulan | null>;
    abstract findByJenis(jenis: string): Promise<JenisUsulan | null>;
    abstract findAll(dto: GetJenisUsulanDto): Promise<{ data: JenisUsulan[]; total: number }>;
}
