import { GetHspksDto } from '../../presentation/hspk/dto/get_hspks.dto';
import { CreateHspkDto } from '../../presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from '../../presentation/hspk/dto/update_hspk.dto';
import { Hspk } from './hspk.entity';

export abstract class HspkRepository {
    abstract create(dto: CreateHspkDto, tahunAnggaran: number): Promise<Hspk>;
    abstract update(dto: UpdateHspkDto): Promise<Hspk>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Hspk | null>;
    abstract findAll(pagination: GetHspksDto): Promise<{ data: Hspk[]; total: number }>;
    abstract findByRuangLingkup(idRuangLingkup: number): Promise<Hspk[]>;
    abstract bulkCreate(rows: Array<CreateHspkDto & { tahun_anggaran: number }>): Promise<number>;
}
