import { JenisUsulan } from "../jenis_usulan/jenis_usulan.entity";

export class JalanSaluranRuangLingkup {
    id!: number;
    id_jenis_usulan!: number;
    deskripsi_ruang_lingkup!: string;

    jenisUsulan?: JenisUsulan;
}
