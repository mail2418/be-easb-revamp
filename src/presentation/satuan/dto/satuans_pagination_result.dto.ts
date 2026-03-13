import { Satuan } from '../../../domain/satuan/satuan.entity';

export interface SatuansPaginationResult {
    satuans: Satuan[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
