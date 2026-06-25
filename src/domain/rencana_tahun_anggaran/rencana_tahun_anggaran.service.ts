import { CreateRencanaTahunAnggaranDto } from '../../presentation/rencana_tahun_anggaran/dto/create_rencana_tahun_anggaran.dto';
import { UpdateRencanaTahunAnggaranDto } from '../../presentation/rencana_tahun_anggaran/dto/update_rencana_tahun_anggaran.dto';
import { DeleteRencanaTahunAnggaranDto } from '../../presentation/rencana_tahun_anggaran/dto/delete_rencana_tahun_anggaran.dto';
import { GetRencanaTahunAnggaransDto } from '../../presentation/rencana_tahun_anggaran/dto/get_rencana_tahun_anggarans.dto';
import { GetRencanaTahunAnggaranDetailDto } from '../../presentation/rencana_tahun_anggaran/dto/get_rencana_tahun_anggaran_detail.dto';
import { RencanaTahunAnggaransPaginationResult } from '../../presentation/rencana_tahun_anggaran/dto/rencana_tahun_anggarans_pagination_result.dto';
import { RencanaTahunAnggaran } from './rencana_tahun_anggaran.entity';

export abstract class RencanaTahunAnggaranService {
    abstract create(dto: CreateRencanaTahunAnggaranDto): Promise<RencanaTahunAnggaran>;
    abstract updateRencanaTahunAnggaran(dto: UpdateRencanaTahunAnggaranDto): Promise<RencanaTahunAnggaran>;
    abstract deleteRencanaTahunAnggaran(dto: DeleteRencanaTahunAnggaranDto): Promise<boolean>;
    abstract getRencanaTahunAnggarans(
        pagination: GetRencanaTahunAnggaransDto,
    ): Promise<RencanaTahunAnggaransPaginationResult>;
    abstract getRencanaTahunAnggaranDetail(
        dto: GetRencanaTahunAnggaranDetailDto,
    ): Promise<RencanaTahunAnggaran>;
}
