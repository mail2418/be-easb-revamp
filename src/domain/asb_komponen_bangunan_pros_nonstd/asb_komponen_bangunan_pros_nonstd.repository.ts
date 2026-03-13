import { CreateAsbKomponenBangunanProsNonstdDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/create_asb_komponen_bangunan_pros_nonstd.dto';
import { GetAsbKomponenBangunanProsNonstdListDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/get_asb_komponen_bangunan_pros_nonstd_list.dto';
import { AsbKomponenBangunanProsNonstd } from './asb_komponen_bangunan_pros_nonstd.entity';

export abstract class AsbKomponenBangunanProsNonstdRepository {
    abstract create(data: CreateAsbKomponenBangunanProsNonstdDto): Promise<AsbKomponenBangunanProsNonstd>;
    abstract update(id: number, data: Partial<AsbKomponenBangunanProsNonstd>): Promise<AsbKomponenBangunanProsNonstd>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbKomponenBangunanProsNonstd | null>;
    abstract findAll(pagination: GetAsbKomponenBangunanProsNonstdListDto): Promise<{ data: AsbKomponenBangunanProsNonstd[], total: number }>;
    abstract findByKomponenBangunanNonstdId(id: number): Promise<AsbKomponenBangunanProsNonstd | null>;
}
