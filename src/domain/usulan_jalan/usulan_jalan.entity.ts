import { Opd } from '../opd/opd.entity';
import { JalanJenisPerkerasan } from '../jalan_jenis_perkerasan/jalan_jenis_perkerasan.entity';
import { JalanSpesifikasiDesain } from '../jalan_spesifikasi_desain/jalan_spesifikasi_desain.entity';
import { JalanRuangLingkup } from '../jalan_ruang_lingkup/jalan_ruang_lingkup.entity';
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

    // Optional Foreign Keys - Spesifikasi Desain
    idSpesifikasiDesain: number | null;
    idSpesifikasiDesainReview: number | null;

    // Optional Foreign Keys - Ruang Lingkup
    idRuangLingkup: number | null;
    idRuangLingkupReview: number | null;

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

    // Relations - Optional (Spesifikasi Desain)
    spesifikasiDesain?: JalanSpesifikasiDesain | null;
    spesifikasiDesainReview?: JalanSpesifikasiDesain | null;

    // Relations - Optional (Ruang Lingkup)
    ruangLingkup?: JalanRuangLingkup | null;
    ruangLingkupReview?: JalanRuangLingkup | null;

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


