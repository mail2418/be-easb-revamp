import { CreateSatuanDto } from '../../presentation/satuan/dto/create_satuan.dto';
import { GetSatuansDto } from '../../presentation/satuan/dto/get_satuans.dto';
import { Satuan } from './satuan.entity';

export abstract class SatuanRepository {
    abstract create(satuan: CreateSatuanDto): Promise<Satuan>;
    abstract update(id: number, data: Partial<Satuan>): Promise<Satuan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Satuan | null>;
    abstract findBySatuan(satuan: string): Promise<Satuan | null>;
    abstract findAll(pagination: GetSatuansDto): Promise<{ data: Satuan[], total: number }>;
}
