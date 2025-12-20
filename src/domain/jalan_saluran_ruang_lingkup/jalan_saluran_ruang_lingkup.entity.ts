import { JenisUsulan } from "../jenis_usulan/jenis_usulan.entity";

export class JalanSaluranRuangLingkup {
    id!: number;
    id_jenis_usulan!: number;
    nomor_divisi!: number;
    deskripsi_divisi!: string;

    jenisUsulan?: JenisUsulan;
}
