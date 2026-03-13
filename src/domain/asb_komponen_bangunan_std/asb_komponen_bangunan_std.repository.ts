import { CreateAsbKomponenBangunanStdDto } from '../../presentation/asb_komponen_bangunan_std/dto/create_asb_komponen_bangunan_std.dto';
import { GetAsbKomponenBangunanStdsDto } from '../../presentation/asb_komponen_bangunan_std/dto/get_asb_komponen_bangunan_stds.dto';
import { AsbKomponenBangunanStd } from './asb_komponen_bangunan_std.entity';

export abstract class AsbKomponenBangunanStdRepository {
    abstract create(data: CreateAsbKomponenBangunanStdDto): Promise<AsbKomponenBangunanStd>;
    abstract update(id: number, data: Partial<AsbKomponenBangunanStd>): Promise<AsbKomponenBangunanStd>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbKomponenBangunanStd | null>;
    abstract findByKomponen(komponen: string): Promise<AsbKomponenBangunanStd | null>;
    abstract findAll(pagination: GetAsbKomponenBangunanStdsDto): Promise<{ data: AsbKomponenBangunanStd[], total: number }>;
}
