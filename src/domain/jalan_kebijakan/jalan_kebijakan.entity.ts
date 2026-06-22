import { KabKota } from "../kabkota/kabkota.entity";

export class JalanKebijakan {
    id!: number;
    idKabkota!: number;
    bulan!: number;
    tahun!: number;
    nilai_ppn!: number;
    nilai_smkk!: number;
    suku_bunga!: number;

    kabkota?: KabKota;
}
