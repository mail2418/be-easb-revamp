import { CreateProvinceDto } from '../../presentation/provinces/dto/create_province.dto';
import { UpdateProvinceDto } from '../../presentation/provinces/dto/update_province.dto';
import { DeleteProvinceDto } from '../../presentation/provinces/dto/delete_province.dto';
import { GetProvincesDto } from '../../presentation/provinces/dto/get_provinces.dto';
import { GetProvinceDetailDto } from '../../presentation/provinces/dto/get_province_detail.dto';
import { ProvincesPaginationResult } from '../../presentation/provinces/dto/provinces_pagination_result.dto';
import { Province } from './province.entity';

export abstract class ProvinceService {
    abstract create(province: CreateProvinceDto): Promise<Province>;
    abstract updateProvince(province: UpdateProvinceDto): Promise<Province>;
    abstract deleteProvince(province: DeleteProvinceDto): Promise<boolean>;
    abstract getProvinces(pagination: GetProvincesDto): Promise<ProvincesPaginationResult>;
    abstract getProvinceDetail(province: GetProvinceDetailDto): Promise<Province>;
    abstract findByKode(kode: string): Promise<Province | null>;
    abstract findById(id: number): Promise<Province | null>;
}
