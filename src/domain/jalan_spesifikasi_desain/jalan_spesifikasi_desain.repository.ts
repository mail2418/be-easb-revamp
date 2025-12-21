import { CreateJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/create_jalan_spesifikasi_desain.dto";
import { GetJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain.dto";
import { UpdateJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/update_jalan_spesifikasi_desain.dto";
import { JalanSpesifikasiDesain } from "./jalan_spesifikasi_desain.entity";

export abstract class JalanSpesifikasiDesainRepository {
    abstract create(dto: CreateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain>;
    abstract update(dto: UpdateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanSpesifikasiDesain | null>;
    abstract findAll(dto: GetJalanSpesifikasiDesainDto): Promise<{ data: JalanSpesifikasiDesain[]; total: number }>;
}
