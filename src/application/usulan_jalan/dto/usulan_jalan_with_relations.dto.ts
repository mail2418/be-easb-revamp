export class UsulanJalanWithRelationsDto {
    id!: number;
    idOpd!: number;
    idUsulanJalanStatus!: number;
    idJalanJenisPerkerasan!: number;
    idJalanJenisPerkerasanReview!: number | null;
    idSpesifikasiDesain!: number | null;
    idSpesifikasiDesainReview!: number | null;
    idRuangLingkup!: number | null;
    idRuangLingkupReview!: number | null;
    idKabkota!: number | null;
    idKecamatan!: number | null;
    idKelurahan!: number | null;
    idVerifikatorAdbang!: number | null;
    idVerifikatorBpkad!: number | null;
    idVerifikatorBappeda!: number | null;
    rejectVerifId!: number | null;
    tahunAnggaran!: number;
    namaUsulanJalan!: string;
    alamat!: string;
    lebarJalan!: number;
    lebarJalanReview!: number | null;
    keteranganTambahan!: string | null;
    keteranganTambahanReview!: string | null;
    verifiedAdbangAt!: Date | null;
    verifiedBpkadAt!: Date | null;
    verifiedBappedaAt!: Date | null;
    rejectedAt!: Date | null;
    rejectReason!: string | null;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date | null;

    // Relations
    opd?: {
        id: number;
        opd: string;
        alias: string;
    };

    usulanJalanStatus?: {
        id: number;
        status: string;
    };

    jalanJenisPerkerasan?: {
        id: number;
        jenis: string;
    };

    jalanJenisPerkerasanReview?: {
        id: number;
        jenis: string;
    } | null;

    spesifikasiDesain?: {
        id: number;
        kode: string;
        uraian: string;
    } | null;

    spesifikasiDesainReview?: {
        id: number;
        kode: string;
        uraian: string;
    } | null;

    ruangLingkup?: {
        id: number;
        ruang_lingkup: string;
    } | null;

    ruangLingkupReview?: {
        id: number;
        ruang_lingkup: string;
    } | null;

    kabkota?: {
        id: number;
        nama: string;
        kode: string;
    } | null;

    kecamatan?: {
        id: number;
        nama: string;
        kode: string;
    } | null;

    kelurahan?: {
        id: number;
        nama: string;
        kode: string;
    } | null;

    verifikatorAdbang?: {
        id: number;
        username: string;
        name: string;
    } | null;

    verifikatorBpkad?: {
        id: number;
        username: string;
        name: string;
    } | null;

    verifikatorBappeda?: {
        id: number;
        username: string;
        name: string;
    } | null;

    rejectVerifikator?: {
        id: number;
        username: string;
        name: string;
    } | null;
}
