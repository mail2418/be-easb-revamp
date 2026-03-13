import { Province } from '../../../domain/provinces/province.entity';

export interface ProvincesPaginationResult {
    provinces: Province[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
