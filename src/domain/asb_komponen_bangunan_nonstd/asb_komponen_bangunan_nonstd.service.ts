import { CreateAsbKomponenBangunanNonstdDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/create_asb_komponen_bangunan_nonstd.dto';
import { UpdateAsbKomponenBangunanNonstdDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/update_asb_komponen_bangunan_nonstd.dto';
import { DeleteAsbKomponenBangunanNonstdDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/delete_asb_komponen_bangunan_nonstd.dto';
import { GetAsbKomponenBangunanNonstdsDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/get_asb_komponen_bangunan_nonstds.dto';
import { GetAsbKomponenBangunanNonstdDetailDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/get_asb_komponen_bangunan_nonstd_detail.dto';
import { AsbKomponenBangunanNonstdsPaginationResult } from '../../presentation/asb_komponen_bangunan_nonstd/dto/asb_komponen_bangunan_nonstd_pagination_result.dto';
import { AsbKomponenBangunanNonstd } from './asb_komponen_bangunan_nonstd.entity';

export abstract class AsbKomponenBangunanNonstdService {
    abstract create(data: CreateAsbKomponenBangunanNonstdDto): Promise<AsbKomponenBangunanNonstd>;
    abstract update(data: UpdateAsbKomponenBangunanNonstdDto): Promise<AsbKomponenBangunanNonstd>;
    abstract delete(data: DeleteAsbKomponenBangunanNonstdDto): Promise<boolean>;
    abstract getAll(pagination: GetAsbKomponenBangunanNonstdsDto): Promise<AsbKomponenBangunanNonstdsPaginationResult>;
    abstract getDetail(data: GetAsbKomponenBangunanNonstdDetailDto): Promise<AsbKomponenBangunanNonstd>;
    abstract findByKomponen(komponen: string): Promise<AsbKomponenBangunanNonstd | null>;
}
