import { CreateProvinceDto } from '../../presentation/provinces/dto/create_province.dto';
import { GetProvincesDto } from '../../presentation/provinces/dto/get_provinces.dto';
import { Province } from './province.entity';

export abstract class ProvinceRepository {
    abstract create(province: CreateProvinceDto): Promise<Province>;
    abstract update(id: number, data: Partial<Province>): Promise<Province>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Province | null>;
    abstract findByKode(kode: string): Promise<Province | null>;
    abstract findAll(pagination: GetProvincesDto): Promise<{ data: Province[], total: number }>;
}
