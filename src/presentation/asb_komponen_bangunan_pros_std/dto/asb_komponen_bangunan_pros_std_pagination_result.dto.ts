import { AsbKomponenBangunanProsStd } from '../../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.entity';

export class AsbKomponenBangunanProsStdPaginationResult {
    komponenBangunanProsList!: AsbKomponenBangunanProsStd[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}
