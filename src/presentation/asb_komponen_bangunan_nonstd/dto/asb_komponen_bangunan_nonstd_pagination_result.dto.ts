import { AsbKomponenBangunanNonstd } from '../../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.entity';

export class AsbKomponenBangunanNonstdsPaginationResult {
    komponenBangunanNonstds!: AsbKomponenBangunanNonstd[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}
