import { KabKota } from '../../../domain/kabkota/kabkota.entity';

export interface KabKotasPaginationResult {
    kabkotas: KabKota[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
