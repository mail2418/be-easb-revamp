import { CreateAsbKomponenBangunanNonstdDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/create_asb_komponen_bangunan_nonstd.dto';
import { GetAsbKomponenBangunanNonstdsDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/get_asb_komponen_bangunan_nonstds.dto';
import { AsbKomponenBangunanNonstd } from './asb_komponen_bangunan_nonstd.entity';

export abstract class AsbKomponenBangunanNonstdRepository {
    abstract create(data: CreateAsbKomponenBangunanNonstdDto): Promise<AsbKomponenBangunanNonstd>;
    abstract update(id: number, data: Partial<AsbKomponenBangunanNonstd>): Promise<AsbKomponenBangunanNonstd>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbKomponenBangunanNonstd | null>;
    abstract findByKomponen(komponen: string): Promise<AsbKomponenBangunanNonstd | null>;
    abstract findAll(pagination: GetAsbKomponenBangunanNonstdsDto): Promise<{ data: AsbKomponenBangunanNonstd[], total: number }>;
}
