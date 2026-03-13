import { CreateAsbKomponenBangunanProsStdDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/create_asb_komponen_bangunan_pros_std.dto';
import { GetAsbKomponenBangunanProsStdListDto } from '../../presentation/asb_komponen_bangunan_pros_std/dto/get_asb_komponen_bangunan_pros_std_list.dto';
import { AsbKomponenBangunanProsStd } from './asb_komponen_bangunan_pros_std.entity';

export abstract class AsbKomponenBangunanProsStdRepository {
    abstract create(data: CreateAsbKomponenBangunanProsStdDto): Promise<AsbKomponenBangunanProsStd>;
    abstract update(id: number, data: Partial<AsbKomponenBangunanProsStd>): Promise<AsbKomponenBangunanProsStd>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbKomponenBangunanProsStd | null>;
    abstract findAll(pagination: GetAsbKomponenBangunanProsStdListDto): Promise<{ data: AsbKomponenBangunanProsStd[], total: number }>;
    abstract findByKomponenBangunanStdId(id: number): Promise<AsbKomponenBangunanProsStd | null>;
}
