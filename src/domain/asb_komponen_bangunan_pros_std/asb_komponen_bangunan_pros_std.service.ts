import { CreateAsbKomponenBangunanProsStdDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/create_asb_komponen_bangunan_pros_std.dto';
import { UpdateAsbKomponenBangunanProsStdDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/update_asb_komponen_bangunan_pros_std.dto';
import { DeleteAsbKomponenBangunanProsStdDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/delete_asb_komponen_bangunan_pros_std.dto';
import { GetAsbKomponenBangunanProsStdListDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/get_asb_komponen_bangunan_pros_std_list.dto';
import { GetAsbKomponenBangunanProsStdDetailDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/get_asb_komponen_bangunan_pros_std_detail.dto';
import { AsbKomponenBangunanProsStdPaginationResult } from '../../presentation/asb_komponen_bangunan_pros_std/dto/asb_komponen_bangunan_pros_std_pagination_result.dto';
import { AsbKomponenBangunanProsStd } from './asb_komponen_bangunan_pros_std.entity';

export abstract class AsbKomponenBangunanProsStdService {
    abstract create(data: CreateAsbKomponenBangunanProsStdDto): Promise<AsbKomponenBangunanProsStd>;
    abstract update(data: UpdateAsbKomponenBangunanProsStdDto): Promise<AsbKomponenBangunanProsStd>;
    abstract delete(data: DeleteAsbKomponenBangunanProsStdDto): Promise<boolean>;
    abstract getAll(pagination: GetAsbKomponenBangunanProsStdListDto): Promise<AsbKomponenBangunanProsStdPaginationResult>;
    abstract getDetail(data: GetAsbKomponenBangunanProsStdDetailDto): Promise<AsbKomponenBangunanProsStd>;
    abstract findByKomponenBangunanStdId(id: number): Promise<AsbKomponenBangunanProsStd | null>;
}
