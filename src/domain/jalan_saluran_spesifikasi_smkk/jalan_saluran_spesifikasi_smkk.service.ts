import { GetJalanSaluranSpesifikasiSmkkByUsulanJalanDto } from '../../presentation/jalan_saluran_spesifikasi_smkk/dto/get_jalan_saluran_spesifikasi_smkk_by_usulan_jalan.dto';
import { JalanSaluranSpesifikasiSmkk } from './jalan_saluran_spesifikasi_smkk.entity';
import { CreateJalanSaluranSpesifikasiSmkkDto } from '../../presentation/jalan_saluran_spesifikasi_smkk/dto/create_jalan_saluran_spesifikasi_smkk.dto';

export abstract class JalanSaluranSpesifikasiSmkkService {
    abstract create(
        dto: CreateJalanSaluranSpesifikasiSmkkDto,
    ): Promise<JalanSaluranSpesifikasiSmkk>;
    abstract deleteByUsulanJalanId(idUsulanJalan: number): Promise<void>;
    abstract getByUsulanJalan(dto: GetJalanSaluranSpesifikasiSmkkByUsulanJalanDto): Promise<{
        data: JalanSaluranSpesifikasiSmkk[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }>;
}
