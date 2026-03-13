import { CreateAsbKomponenBangunanProsNonstdDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/create_asb_komponen_bangunan_pros_nonstd.dto';
import { UpdateAsbKomponenBangunanProsNonstdDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/update_asb_komponen_bangunan_pros_nonstd.dto';
import { DeleteAsbKomponenBangunanProsNonstdDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/delete_asb_komponen_bangunan_pros_nonstd.dto';
import { GetAsbKomponenBangunanProsNonstdListDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/get_asb_komponen_bangunan_pros_nonstd_list.dto';
import { GetAsbKomponenBangunanProsNonstdDetailDto } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/get_asb_komponen_bangunan_pros_nonstd_detail.dto';
import { AsbKomponenBangunanProsNonstdPaginationResult } from '../../presentation/asb_komponen_bangunan_pros_nonstd/dto/asb_komponen_bangunan_pros_nonstd_pagination_result.dto';
import { AsbKomponenBangunanProsNonstd } from './asb_komponen_bangunan_pros_nonstd.entity';

export abstract class AsbKomponenBangunanProsNonstdService {
    abstract create(data: CreateAsbKomponenBangunanProsNonstdDto): Promise<AsbKomponenBangunanProsNonstd>;
    abstract update(data: UpdateAsbKomponenBangunanProsNonstdDto): Promise<AsbKomponenBangunanProsNonstd>;
    abstract delete(data: DeleteAsbKomponenBangunanProsNonstdDto): Promise<boolean>;
    abstract getAll(pagination: GetAsbKomponenBangunanProsNonstdListDto): Promise<AsbKomponenBangunanProsNonstdPaginationResult>;
    abstract getDetail(data: GetAsbKomponenBangunanProsNonstdDetailDto): Promise<AsbKomponenBangunanProsNonstd>;
    abstract findByKomponenBangunanNonstdId(id: number): Promise<AsbKomponenBangunanProsNonstd | null>;
}
