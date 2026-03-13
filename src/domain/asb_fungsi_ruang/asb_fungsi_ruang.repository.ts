import { GetAsbFungsiRuangsDto } from 'src/presentation/asb_fungsi_ruang/dto/get_asb_fungsi_ruangs.dto';
import { AsbFungsiRuang } from './asb_fungsi_ruang.entity';
import { CreateAsbFungsiRuangDto } from 'src/presentation/asb_fungsi_ruang/dto/create_asb_fungsi_ruang.dto';

export abstract class AsbFungsiRuangRepository {
    abstract create(asbFungsiRuang: CreateAsbFungsiRuangDto): Promise<AsbFungsiRuang>;
    abstract update(id: number, asbFungsiRuang: Partial<AsbFungsiRuang>): Promise<AsbFungsiRuang>;
    abstract delete(id: number): Promise<boolean>;
    abstract findAll(pagination: GetAsbFungsiRuangsDto): Promise<{ data: AsbFungsiRuang[]; total: number}>;
    abstract findById(id: number): Promise<AsbFungsiRuang | null>;
    abstract findByNama(nama: string): Promise<AsbFungsiRuang | null>;
}
