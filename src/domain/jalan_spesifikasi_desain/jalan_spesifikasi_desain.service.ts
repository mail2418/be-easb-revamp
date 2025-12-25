import { CreateJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/create_jalan_spesifikasi_desain.dto";
import { GetJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain.dto";
import { JalanSpesifikasiDesainPaginationResultDto } from "../../presentation/jalan_spesifikasi_desain/dto/jalan_spesifikasi_desain_pagination_result.dto";
import { UpdateJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/update_jalan_spesifikasi_desain.dto";
import { JalanSpesifikasiDesain } from "./jalan_spesifikasi_desain.entity";
import { GetJalanSpesifikasiDesainByUsulanJalanDto } from "../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain_by_usulan_jalan.dto";

export abstract class JalanSpesifikasiDesainService {
    abstract create(dto: CreateJalanSpesifikasiDesainDto, lebar?: number): Promise<JalanSpesifikasiDesain>;
    abstract update(dto: UpdateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanSpesifikasiDesain | null>;
    abstract findAll(dto: GetJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesainPaginationResultDto>;
    abstract deleteByUsulanJalanId(idUsulanJalan: number): Promise<void>;
    abstract getByUsulanJalan(dto: GetJalanSpesifikasiDesainByUsulanJalanDto): Promise<{ data: JalanSpesifikasiDesain[]; total: number; page: number; amount: number; totalPages: number }>;
}
