import { CreateSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/create_saluran_spesifikasi_desain.dto';
import { GetSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/get_saluran_spesifikasi_desain.dto';
import { UpdateSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/update_saluran_spesifikasi_desain.dto';
import { SaluranSpesifikasiDesain } from './saluran_spesifikasi_desain.entity';

export abstract class SaluranSpesifikasiDesainRepository {
    abstract create(dto: CreateSaluranSpesifikasiDesainDto): Promise<SaluranSpesifikasiDesain>;
    abstract update(dto: UpdateSaluranSpesifikasiDesainDto): Promise<SaluranSpesifikasiDesain>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<SaluranSpesifikasiDesain | null>;
    abstract findAll(
        dto: GetSaluranSpesifikasiDesainDto,
    ): Promise<{ data: SaluranSpesifikasiDesain[]; total: number }>;
    abstract deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void>;
    abstract findByUsulanSaluran(
        idUsulanSaluran: number,
        page?: number,
        amount?: number,
    ): Promise<[SaluranSpesifikasiDesain[], number]>;
}
