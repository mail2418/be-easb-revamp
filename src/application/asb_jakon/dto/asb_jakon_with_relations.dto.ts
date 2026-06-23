import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

export class AsbJakonWithRelationsDto {
    id: number;
    idAsbTipeBangunan: number;
    idAsbJenis: number;
    idAsbKlasifikasi: number;
    tahun: number;
    type: AsbJakonType;
    nama: string;
    spec: string;
    priceFrom: number;
    priceTo: number;
    satuan: string;
    standard: number;

    // Related entities
    asbTipeBangunan?: {
        id: number;
        tipe_bangunan: string;
    } | null;

    asbJenis?: {
        id: number;
        jenis: string;
        asb: string;
    } | null;

    asbKlasifikasi?: {
        id: number;
        klasifikasi: string;
    } | null;
}
