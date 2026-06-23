import { CreateSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/create_saluran_spesifikasi_desain.dto';
import { GetSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/get_saluran_spesifikasi_desain.dto';
import { SaluranSpesifikasiDesainPaginationResultDto } from '../../presentation/saluran_spesifikasi_desain/dto/saluran_spesifikasi_desain_pagination_result.dto';
import { UpdateSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/update_saluran_spesifikasi_desain.dto';
import { SaluranSpesifikasiDesain } from './saluran_spesifikasi_desain.entity';
import { GetSaluranSpesifikasiDesainByUsulanSaluranDto } from '../../presentation/saluran_spesifikasi_desain/dto/get_saluran_spesifikasi_desain_by_usulan_saluran.dto';

export abstract class SaluranSpesifikasiDesainService {
    abstract create(
        dto: CreateSaluranSpesifikasiDesainDto,
        lebar?: number,
    ): Promise<SaluranSpesifikasiDesain>;
    abstract update(dto: UpdateSaluranSpesifikasiDesainDto): Promise<SaluranSpesifikasiDesain>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<SaluranSpesifikasiDesain | null>;
    abstract findAll(
        dto: GetSaluranSpesifikasiDesainDto,
    ): Promise<SaluranSpesifikasiDesainPaginationResultDto>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract getByUsulanSaluran(dto: GetSaluranSpesifikasiDesainByUsulanSaluranDto): Promise<{
        data: SaluranSpesifikasiDesain[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }>;
}
