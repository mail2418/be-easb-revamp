import { CreateAsbFungsiRuangDto } from 'src/presentation/asb_fungsi_ruang/dto/create_asb_fungsi_ruang.dto';
import { AsbFungsiRuang } from './asb_fungsi_ruang.entity';
import { GetAsbFungsiRuangsDto } from 'src/presentation/asb_fungsi_ruang/dto/get_asb_fungsi_ruangs.dto';
import { UpdateAsbFungsiRuangDto } from 'src/presentation/asb_fungsi_ruang/dto/update_asb_fungsi_ruang.dto';

export abstract class AsbFungsiRuangService {
    abstract create(asbFungsiRuang: CreateAsbFungsiRuangDto): Promise<AsbFungsiRuang>;
    abstract update(asbFungsiRuang: UpdateAsbFungsiRuangDto): Promise<AsbFungsiRuang>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbFungsiRuang | null>;
    abstract findByNama(nama: string): Promise<AsbFungsiRuang | null>;
    abstract findAll(pagination: GetAsbFungsiRuangsDto): Promise<{ data: AsbFungsiRuang[]; total: number }>;
}
