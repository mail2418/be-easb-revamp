import { CreateRencanaTahunAnggaranDto } from '../../presentation/rencana_tahun_anggaran/dto/create_rencana_tahun_anggaran.dto';
import { GetRencanaTahunAnggaransDto } from '../../presentation/rencana_tahun_anggaran/dto/get_rencana_tahun_anggarans.dto';
import { RencanaTahunAnggaran } from './rencana_tahun_anggaran.entity';

export abstract class RencanaTahunAnggaranRepository {
    abstract create(dto: CreateRencanaTahunAnggaranDto): Promise<RencanaTahunAnggaran>;
    abstract update(id: number, data: Partial<RencanaTahunAnggaran>): Promise<RencanaTahunAnggaran>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<RencanaTahunAnggaran | null>;
    abstract findByTahun(tahun: number): Promise<RencanaTahunAnggaran | null>;
    abstract findAll(
        pagination: GetRencanaTahunAnggaransDto,
    ): Promise<{ data: RencanaTahunAnggaran[]; total: number }>;
}
