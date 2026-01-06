import { JalanSaluranSpesifikasiSmkk } from "./jalan_saluran_spesifikasi_smkk.entity";
import { CreateJalanSaluranSpesifikasiSmkkDto } from "../../presentation/jalan_saluran_spesifikasi_smkk/dto/create_jalan_saluran_spesifikasi_smkk.dto";

export abstract class JalanSaluranSpesifikasiSmkkRepository {
    abstract create(dto: CreateJalanSaluranSpesifikasiSmkkDto): Promise<JalanSaluranSpesifikasiSmkk>;
    abstract deleteByUsulanJalanId(idUsulanJalan: number): Promise<void>;
    abstract findByUsulanJalan(idUsulanJalan: number, page?: number, amount?: number): Promise<[JalanSaluranSpesifikasiSmkk[], number]>;
}

