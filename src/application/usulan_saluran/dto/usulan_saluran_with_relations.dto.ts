export class UsulanSaluranWithRelationsDto {
    id!: number;
    idOpd!: number;
    idUsulanSaluranStatus!: number;
    idAsbJenis!: number;
    idTipeSaluran!: number | null;
    idRekening!: number | null;
    idRekeningReview!: number | null;
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
    uraian!: string | null;
    spesifikasi!: string | null;
    satuan!: string | null;
    deskripsiDesain!: string | null;
    keteranganTambahan!: string | null;
    lebar!: number | null;
    totalHarga!: number | null;
    biayaSmkk!: number | null;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date | null;

    opd?: {
        id: number;
        opd: string;
        alias: string;
    };

    asbJenis?: {
        id: number;
        jenis: string;
    };

    tipeSaluran?: {
        id: number;
        tipe_saluran: string;
    } | null;

    usulanSaluranStatus?: {
        id: number;
        status: string;
    };

    rekening?: {
        id: number;
        kode: string;
        uraian: string;
    } | null;

    rekeningReview?: {
        id: number;
        kode: string;
        uraian: string;
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

    spesifikasiDesain?: Array<{
        id: number;
        id_usulan_saluran: number;
        id_ruang_lingkup: number;
        id_hspk: number;
        volume: number;
        spasi: number;
        tinggi: number;
        harga_spec: number;
        keterangan_tambahan: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        ruangLingkup?: {
            id: number;
            deskripsi_ruang_lingkup: string;
        } | null;
        hspk?: {
            id: number;
            no_mata_pembayaran: string;
            uraian: string | null;
        } | null;
    }>;

    spesifikasiDesainReview?: Array<{
        id: number;
        id_usulan_saluran: number;
        id_ruang_lingkup: number;
        id_hspk: number;
        volume_review: number;
        spasi_review: number;
        tinggi_review: number;
        harga_spec_review: number;
        keterangan_tambahan_review: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        ruangLingkup?: {
            id: number;
            deskripsi_ruang_lingkup: string;
        } | null;
        hspk?: {
            id: number;
            no_mata_pembayaran: string;
            uraian: string | null;
        } | null;
    }>;

    spesifikasiSmkk?: Array<{
        id: number;
        id_jenis_usulan: number;
        id_usulan: number;
        id_jalan_saluran_smkk: number;
        harga_spec: number;
        jumlah_barang: number;
        harga_satuan: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        jenisUsulan?: {
            id: number;
            jenis: string;
        } | null;
        jalanSaluranSmkk?: {
            id: number;
            id_jenis_usulan: number;
            no_mata_pembayaran: string;
            satuan: string;
            uraian: string;
            pengali: number;
        } | null;
    }>;

    spesifikasiSmkkReview?: Array<{
        id: number;
        id_jenis_usulan: number;
        id_usulan: number;
        id_jalan_saluran_smkk: number;
        harga_spec: number;
        jumlah_barang: number;
        harga_satuan: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        jenisUsulan?: {
            id: number;
            jenis: string;
        } | null;
        jalanSaluranSmkk?: {
            id: number;
            id_jenis_usulan: number;
            no_mata_pembayaran: string;
            satuan: string;
            uraian: string;
            pengali: number;
        } | null;
    }>;
}
