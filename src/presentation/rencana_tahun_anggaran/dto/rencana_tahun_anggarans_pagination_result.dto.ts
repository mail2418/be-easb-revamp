import { RencanaTahunAnggaran } from '../../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.entity';

export interface RencanaTahunAnggaransPaginationResult {
    rencanaTahunAnggarans: RencanaTahunAnggaran[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
