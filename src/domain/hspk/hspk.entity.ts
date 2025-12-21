import { JalanSaluranRuangLingkup } from '../jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.entity';

export class Hspk {
    id!: number;
    id_ruang_lingkup!: number;
    no_mata_pembayaran!: string;
    satuan!: string;
    harga_satuan!: number;

    jalanSaluranRuangLingkup?: JalanSaluranRuangLingkup;
}

