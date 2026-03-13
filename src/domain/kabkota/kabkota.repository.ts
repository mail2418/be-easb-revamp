import { CreateKabKotaDto } from '../../presentation/kabkota/dto/create_kabkota.dto';
import { GetKabKotasDto } from '../../presentation/kabkota/dto/get_kabkotas.dto';
import { KabKota } from './kabkota.entity';

export abstract class KabKotaRepository {
    abstract create(kabkota: CreateKabKotaDto): Promise<KabKota>;
    abstract update(id: number, data: Partial<KabKota>): Promise<KabKota>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<KabKota | null>;
    abstract findByKode(kode: string): Promise<KabKota | null>;
    abstract findByProvinceId(provinceId: number): Promise<KabKota[]>;
    abstract findAll(pagination: GetKabKotasDto): Promise<{ data: KabKota[], total: number }>;
}
