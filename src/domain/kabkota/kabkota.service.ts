import { CreateKabKotaDto } from '../../presentation/kabkota/dto/create_kabkota.dto';
import { UpdateKabKotaDto } from '../../presentation/kabkota/dto/update_kabkota.dto';
import { DeleteKabKotaDto } from '../../presentation/kabkota/dto/delete_kabkota.dto';
import { GetKabKotasDto } from '../../presentation/kabkota/dto/get_kabkotas.dto';
import { GetKabKotaDetailDto } from '../../presentation/kabkota/dto/get_kabkota_detail.dto';
import { KabKotasPaginationResult } from '../../presentation/kabkota/dto/kabkotas_pagination_result.dto';
import { KabKota } from './kabkota.entity';

export abstract class KabKotaService {
    abstract create(kabkota: CreateKabKotaDto): Promise<KabKota>;
    abstract updateKabKota(kabkota: UpdateKabKotaDto): Promise<KabKota>;
    abstract deleteKabKota(kabkota: DeleteKabKotaDto): Promise<boolean>;
    abstract getKabKotas(pagination: GetKabKotasDto): Promise<KabKotasPaginationResult>;
    abstract getKabKotaDetail(kabkota: GetKabKotaDetailDto): Promise<KabKota>;
    abstract findByKode(kode: string): Promise<KabKota | null>;
    abstract findById(id: number): Promise<KabKota | null>;
    abstract findByProvinceId(provinceId: number): Promise<KabKota[]>;
    abstract getKabKotasByProvince(provinceId: number, pagination?: GetKabKotasDto): Promise<KabKotasPaginationResult>;
}
