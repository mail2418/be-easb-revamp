import { Opd } from '../opd/opd.entity';
import { UsulanSaluranStatus } from '../usulan_saluran_status/usulan_saluran_status.entity';
import { AsbJenis } from '../asb_jenis/asb_jenis.entity';
import { TipeSaluran } from '../tipe_saluran/tipe_saluran.entity';
import { Rekening } from '../rekening/rekening.entity';
import { KabKota } from '../kabkota/kabkota.entity';
import { Kecamatan } from '../kecamatan/kecamatan.entity';
import { Kelurahan } from '../kelurahan/kelurahan.entity';
import { User } from '../user/user.entity';

export class UsulanSaluran {
    id!: number;

    // Required Foreign Keys
    idOpd!: number;
    idUsulanSaluranStatus!: number;
    idAsbJenis!: number;
    idRekening!: number | null;
    idRekeningReview!: number | null;

    // Optional Foreign Keys - Saluran
    idTipeSaluran!: number | null;

    // Optional Foreign Keys - Location
    idKabkota!: number | null;
    idKecamatan!: number | null;
    idKelurahan!: number | null;

    // Optional Foreign Keys - Verifikators
    idVerifikatorAdbang!: number | null;
    idVerifikatorBpkad!: number | null;
    idVerifikatorBappeda!: number | null;
    idRejectVerif!: number | null;

    // Verifikator Review At
    verifikatorAdbangReviewAt!: Date | null;
    verifikatorBpkadReviewAt!: Date | null;
    verifikatorBappedaReviewAt!: Date | null;
    rejectVerifikatorReviewAt!: Date | null;

    // Reject reason
    rejectReason!: string | null;

    // Core fields
    isIncludePpn!: boolean;
    tahunAnggaran!: number;
    namaUsulan!: string;
    alamat!: string | null;
    uraian!: string | null;
    spesifikasi!: string | null;
    satuan!: string | null;
    deskripsiDesain!: string | null;
    keteranganTambahan!: string | null;
    lebar!: number | null;
    totalHarga!: number | null;
    biayaSmkk!: number | null;

    // Relations - Required
    opd?: Opd;
    usulanSaluranStatus?: UsulanSaluranStatus;
    asbJenis?: AsbJenis;
    rekening?: Rekening | null;
    rekeningReview?: Rekening | null;

    // Relations - Optional (Saluran)
    tipeSaluran?: TipeSaluran | null;

    // Relations - Optional (Location)
    kabkota?: KabKota | null;
    kecamatan?: Kecamatan | null;
    kelurahan?: Kelurahan | null;

    // Relations - Optional (Verifikators)
    verifikatorAdbang?: User | null;
    verifikatorBpkad?: User | null;
    verifikatorBappeda?: User | null;
    rejectVerifikator?: User | null;
}
