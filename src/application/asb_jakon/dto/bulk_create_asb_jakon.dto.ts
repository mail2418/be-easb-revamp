import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

export interface BulkCreateAsbJakonDto {
    tahun: number;
    file: string;
    idAsbTipeBangunan: number;
    idAsbJenis: number;
    idAsbKlasifikasi: number;
    type: AsbJakonType;
    nama: string;
    spec: string;
    priceFrom: number;
    priceTo: number;
    satuan: string;
    standard: number;
}
