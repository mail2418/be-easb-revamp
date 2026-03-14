import { GetSaluranSpesifikasiSmkkByUsulanSaluranDto } from "../../presentation/saluran_spesifikasi_smkk/dto/get_saluran_spesifikasi_smkk_by_usulan_saluran.dto";
import { SaluranSpesifikasiSmkk } from "./saluran_spesifikasi_smkk.entity";
import { CreateSaluranSpesifikasiSmkkDto } from "../../presentation/saluran_spesifikasi_smkk/dto/create_saluran_spesifikasi_smkk.dto";

export abstract class SaluranSpesifikasiSmkkService {
    abstract create(dto: CreateSaluranSpesifikasiSmkkDto): Promise<SaluranSpesifikasiSmkk>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract getByUsulanSaluran(dto: GetSaluranSpesifikasiSmkkByUsulanSaluranDto): Promise<{ data: SaluranSpesifikasiSmkk[]; total: number; page: number; amount: number; totalPages: number }>;
}
