import { AsbJakonType } from './asb_jakon_type.enum';

export class AsbJakon {
    id!: number;
    idAsbTipeBangunan!: number;
    idAsbJenis!: number;
    idAsbKlasifikasi!: number;
    tahun!: number;
    type!: AsbJakonType;
    nama!: string; // text
    spec!: string; // varchar
    priceFrom!: number;
    priceTo!: number;
    satuan!: string; // varchar
    standard!: number;
}
