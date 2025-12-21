import { Hspk } from './hspk.entity';
import { CreateHspkDto } from 'src/presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from 'src/presentation/hspk/dto/update_hspk.dto';
import { GetHspkDto } from 'src/presentation/hspk/dto/get_hspk.dto';

export abstract class HspkRepository {
    abstract create(dto: CreateHspkDto): Promise<Hspk>;
    abstract update(dto: UpdateHspkDto): Promise<Hspk>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Hspk | null>;
    abstract findAll(dto: GetHspkDto): Promise<{ data: Hspk[]; total: number }>;
    abstract findByNoMataPembayaran(no_mata_pembayaran: string): Promise<Hspk | null>;
    abstract findByRuangLingkup(id_ruang_lingkup: number): Promise<Hspk[]>;
}

