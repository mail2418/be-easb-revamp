export class Rekening {
    id!: number;
    rekening_kode!: string;
    rekening_uraian!: string;
    bulan!: number;
    tahun!: number;
    id_jenis_usulan?: number | null;
}
