import { Opd } from '../opd/opd.entity';
import { UsulanJalanStatus } from '../usulan_jalan_status/usulan_jalan_status.entity';
import { AsbJenis } from '../asb_jenis/asb_jenis.entity';
import { JalanJenisPemeliharaan } from '../jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.entity';
import { JalanJenisPerkerasan } from '../jalan_jenis_perkerasan/jalan_jenis_perkerasan.entity';
import { Rekening } from '../rekening/rekening.entity';
import { KabKota } from '../kabkota/kabkota.entity';
import { Kecamatan } from '../kecamatan/kecamatan.entity';
import { Kelurahan } from '../kelurahan/kelurahan.entity';
import { User } from '../user/user.entity';

export class UsulanJalan {
    id!: number;

    // Required Foreign Keys
    idOpd!: number;
    idUsulanJalanStatus!: number;
    idAsbJenis!: number;
    idRekening!: number;
    idRekeningReview!: number;

    // Optional Foreign Keys - Jalan
    idJalanJenisPemeliharaan!: number | null;
    idJalanJenisPerkerasan!: number | null;

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
    uraian!: string;
    spesifikasi!: string;
    satuan!: string;
    hargaSatuan!: number;
    deskripsiDesain!: string;

    // Relations - Required
    opd?: Opd;
    usulanJalanStatus?: UsulanJalanStatus;
    asbJenis?: AsbJenis;
    rekening?: Rekening;
    rekeningReview?: Rekening;

    // Relations - Optional (Jalan)
    jalanJenisPemeliharaan?: JalanJenisPemeliharaan | null;
    jalanJenisPerkerasan?: JalanJenisPerkerasan | null;

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


