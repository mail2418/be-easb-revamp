export class UsulanJalanWithRelationsDto {
    id!: number;
    idOpd!: number;
    idUsulanJalanStatus!: number;
    idJalanJenisPerkerasan!: number;
    idJalanJenisPerkerasanReview!: number | null;
    idMutuBeton!: number | null;
    idMutuBetonReview!: number | null;
    idSpesifikasiDesainLentur!: number | null;
    idSpesifikasiDesainLenturReview!: number | null;
    idSpesifikasiDesainKaku!: number | null;
    idSpesifikasiDesainKakuReview!: number | null;
    idRuangLingkupPerkerasanLentur!: number | null;
    idRuangLingkupPerkerasanLenturReview!: number | null;
    idRuangLingkupPerkerasanKaku!: number | null;
    idRuangLingkupPerkerasanKakuReview!: number | null;
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

    mutuBeton?: {
        id: number;
        jenis: string;
    } | null;

    mutuBetonReview?: {
        id: number;
        jenis: string;
    } | null;

    spesifikasiDesainLentur?: {
        id: number;
        spec: string;
        desc: string;
    } | null;

    spesifikasiDesainLenturReview?: {
        id: number;
        spec: string;
        desc: string;
    } | null;

    spesifikasiDesainKaku?: {
        id: number;
        spec: string;
        desc: string;
    } | null;

    spesifikasiDesainKakuReview?: {
        id: number;
        spec: string;
        desc: string;
    } | null;

    ruangLingkupPerkerasanLentur?: {
        id: number;
        jenis: string;
    } | null;

    ruangLingkupPerkerasanLenturReview?: {
        id: number;
        jenis: string;
    } | null;

    ruangLingkupPerkerasanKaku?: {
        id: number;
        jenis: string;
    } | null;

    ruangLingkupPerkerasanKakuReview?: {
        id: number;
        jenis: string;
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


