export class UsulanJalanWithRelationsDto {
    id!: number;
    idOpd!: number;
    idUsulanJalanStatus!: number;
    idAsbJenis!: number;
    idJalanJenisPemeliharaan!: number | null;
    idJalanJenisPerkerasan!: number | null;
    idRekening!: number;
    idRekeningReview!: number;
    idKabkota!: number | null;
    idKecamatan!: number | null;
    idKelurahan!: number | null;
    idVerifikatorAdbang!: number | null;
    idVerifikatorBpkad!: number | null;
    idVerifikatorBappeda!: number | null;
    idRejectVerif!: number | null;
    verifikatorAdbangReviewAt!: Date | null;
    verifikatorBpkadReviewAt!: Date | null;
    verifikatorBappedaReviewAt!: Date | null;
    rejectVerifikatorReviewAt!: Date | null;
    rejectReason!: string | null;
    isIncludePpn!: boolean;
    tahunAnggaran!: number;
    namaUsulan!: string;
    alamat!: string | null;
    uraian!: string;
    spesifikasi!: string;
    satuan!: string;
    deskripsiDesain!: string;
    lebar!: number | null;
    totalHarga!: number | null;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date | null;

    // Relations
    opd?: {
        id: number;
        opd: string;
        alias: string;
    };

    asbJenis?: {
        id: number;
        jenis: string;
    };

    jalanJenisPemeliharaan?: {
        id: number;
        jenis: string;
    } | null;

    usulanJalanStatus?: {
        id: number;
        status: string;
    };

    jalanJenisPerkerasan?: {
        id: number;
        jenis: string;
    } | null;

    rekening?: {
        id: number;
        kode: string;
        uraian: string;
    };

    rekeningReview?: {
        id: number;
        kode: string;
        uraian: string;
    };

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
