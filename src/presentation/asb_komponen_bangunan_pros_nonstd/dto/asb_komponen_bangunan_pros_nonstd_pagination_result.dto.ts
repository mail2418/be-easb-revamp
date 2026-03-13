import { AsbKomponenBangunanProsNonstd } from '../../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.entity';

export class AsbKomponenBangunanProsNonstdPaginationResult {
    komponenBangunanProsList!: AsbKomponenBangunanProsNonstd[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}
