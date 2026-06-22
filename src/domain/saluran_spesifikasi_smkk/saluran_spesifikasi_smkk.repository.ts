import { SaluranSpesifikasiSmkk } from "./saluran_spesifikasi_smkk.entity";
import { CreateSaluranSpesifikasiSmkkDto } from "../../presentation/saluran_spesifikasi_smkk/dto/create_saluran_spesifikasi_smkk.dto";

export abstract class SaluranSpesifikasiSmkkRepository {
    abstract create(dto: CreateSaluranSpesifikasiSmkkDto): Promise<SaluranSpesifikasiSmkk>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract findByUsulanSaluran(idUsulanSaluran: number, page?: number, amount?: number): Promise<[SaluranSpesifikasiSmkk[], number]>;
}
