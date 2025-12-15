import { Opd } from '../opd/opd.entity';
import { JalanJenisPerkerasan } from '../jalan_jenis_perkerasan/jalan_jenis_perkerasan.entity';
import { JalanMutuBeton } from '../jalan_mutu_beton/jalan_mutu_beton.entity';
import { JalanSpesifikasiDesainLentur } from '../jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.entity';
import { JalanSpesifikasiDesainKaku } from '../jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.entity';
import { JalanRuangLingkupPerkerasanLentur } from '../jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.entity';
import { JalanRuangLingkupPerkerasanKaku } from '../jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.entity';
import { UsulanJalanStatus } from '../usulan_jalan_status/usulan_jalan_status.entity';
import { KabKota } from '../kabkota/kabkota.entity';
import { Kecamatan } from '../kecamatan/kecamatan.entity';
import { Kelurahan } from '../kelurahan/kelurahan.entity';
import { User } from '../user/user.entity';

export class UsulanJalan {
    id: number;

    // Required Foreign Keys
    idOpd: number;
    idUsulanJalanStatus: number;
    idJalanJenisPerkerasan: number;

    // Optional Foreign Keys - Jenis Perkerasan Review
    idJalanJenisPerkerasanReview: number | null;

    // Optional Foreign Keys - Mutu Beton
    idMutuBeton: number | null;
    idMutuBetonReview: number | null;

    // Optional Foreign Keys - Spesifikasi Desain Lentur (required if id_jalan_jenis_perkerasan == 1)
    idSpesifikasiDesainLentur: number | null;
    idSpesifikasiDesainLenturReview: number | null;

    // Optional Foreign Keys - Spesifikasi Desain Kaku (required if id_jalan_jenis_perkerasan == 2)
    idSpesifikasiDesainKaku: number | null;
    idSpesifikasiDesainKakuReview: number | null;

    // Optional Foreign Keys - Ruang Lingkup Lentur (required if id_jalan_jenis_perkerasan == 1)
    idRuangLingkupPerkerasanLentur: number | null;
    idRuangLingkupPerkerasanLenturReview: number | null;

    // Optional Foreign Keys - Ruang Lingkup Kaku (required if id_jalan_jenis_perkerasan == 2)
    idRuangLingkupPerkerasanKaku: number | null;
    idRuangLingkupPerkerasanKakuReview: number | null;

    // Optional Foreign Keys - Location
    idKabkota: number | null;
    idKecamatan: number | null;
    idKelurahan: number | null;

    // Optional Foreign Keys - Verifikators
    idVerifikatorAdbang: number | null;
    idVerifikatorBpkad: number | null;
    idVerifikatorBappeda: number | null;
    rejectVerifId: number | null;

    // Core fields
    tahunAnggaran: number;
    namaUsulanJalan: string;
    alamat: string;
    lebarJalan: number;
    lebarJalanReview: number | null;
    keteranganTambahan: string | null;
    keteranganTambahanReview: string | null;

    // Verification timestamps
    verifiedAdbangAt: Date | null;
    verifiedBpkadAt: Date | null;
    verifiedBappedaAt: Date | null;
    rejectedAt: Date | null;
    rejectReason: string | null;

    // Relations - Required
    opd?: Opd;
    usulanJalanStatus?: UsulanJalanStatus;
    jalanJenisPerkerasan?: JalanJenisPerkerasan;

    // Relations - Optional (Jenis Perkerasan Review)
    jalanJenisPerkerasanReview?: JalanJenisPerkerasan | null;

    // Relations - Optional (Mutu Beton)
    mutuBeton?: JalanMutuBeton | null;
    mutuBetonReview?: JalanMutuBeton | null;

    // Relations - Optional (Spesifikasi Desain Lentur)
    spesifikasiDesainLentur?: JalanSpesifikasiDesainLentur | null;
    spesifikasiDesainLenturReview?: JalanSpesifikasiDesainLentur | null;

    // Relations - Optional (Spesifikasi Desain Kaku)
    spesifikasiDesainKaku?: JalanSpesifikasiDesainKaku | null;
    spesifikasiDesainKakuReview?: JalanSpesifikasiDesainKaku | null;

    // Relations - Optional (Ruang Lingkup Lentur)
    ruangLingkupPerkerasanLentur?: JalanRuangLingkupPerkerasanLentur | null;
    ruangLingkupPerkerasanLenturReview?: JalanRuangLingkupPerkerasanLentur | null;

    // Relations - Optional (Ruang Lingkup Kaku)
    ruangLingkupPerkerasanKaku?: JalanRuangLingkupPerkerasanKaku | null;
    ruangLingkupPerkerasanKakuReview?: JalanRuangLingkupPerkerasanKaku | null;

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


