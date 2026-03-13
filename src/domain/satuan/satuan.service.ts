import { CreateSatuanDto } from '../../presentation/satuan/dto/create_satuan.dto';
import { UpdateSatuanDto } from '../../presentation/satuan/dto/update_satuan.dto';
import { DeleteSatuanDto } from '../../presentation/satuan/dto/delete_satuan.dto';
import { GetSatuansDto } from '../../presentation/satuan/dto/get_satuans.dto';
import { GetSatuanDetailDto } from '../../presentation/satuan/dto/get_satuan_detail.dto';
import { SatuansPaginationResult } from '../../presentation/satuan/dto/satuans_pagination_result.dto';
import { Satuan } from './satuan.entity';

export abstract class SatuanService {
    abstract create(satuan: CreateSatuanDto): Promise<Satuan>;
    abstract updateSatuan(satuan: UpdateSatuanDto): Promise<Satuan>;
    abstract deleteSatuan(satuan: DeleteSatuanDto): Promise<boolean>;
    abstract getSatuans(pagination: GetSatuansDto): Promise<SatuansPaginationResult>;
    abstract getSatuanDetail(satuan: GetSatuanDetailDto): Promise<Satuan>;
    abstract findBySatuan(satuan: string): Promise<Satuan | null>;
    abstract findById(id: number): Promise<Satuan | null>;
}
