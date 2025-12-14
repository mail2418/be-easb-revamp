export class AsbWithRelationsDto {
    id: number;
    idAsbJenis: number;
    idAsbStatus: number;
    idOpd: number;
    idAsbTipeBangunan: number;
    idRekening: number | null;
    idRekeningReview: number | null;
    idKabkota: number | null;
    idAsbKlasifikasi: number | null;
    idVerifikatorAdpem: number | null;
    idVerifikatorBPKAD: number | null;
    idVerifikatorBappeda: number | null;
    rejectVerifId: number | null;
    tahunAnggaran: number | null;
    namaAsb: string;
    alamat: string | null;
    jumlahKontraktor: number | null;
    totalLantai: number | null;
    luasTanah: number | null;
    verifiedAdpemAt: Date | null;
    verifiedBpkadAt: Date | null;
    verifiedBappedaAt: Date | null;
    rejectedAt: Date | null;
    rejectReason: string | null;
    shst: number | null;
    perencanaanKonstruksi: number | null;
    pengawasanKonstruksi: number | null;
    managementKonstruksi: number | null;
    pengelolaanKegiatan: number | null;
    luasTotalBangunan: number | null;
    koefisienLantaiTotal: number | null;
    koefisienFungsiRuangTotal: number | null;
    totalBiayaPembangunan: number | null;
    nominalBps: number | null;
    nominalBpns: number | null;
    bobotTotalBps: number | null;
    bobotTotalBpns: number | null;
    rekapitulasiBiayaKonstruksi: number | null;
    rekapitulasiBiayaKonstruksiRounded: number | null;

    // Related entities
    kabkota?: {
        id: number;
        nama: string;
        idProvinsi: number;
    } | null;

    asbStatus?: {
        id: number;
        status: string;
    };

    asbJenis?: {
        id: number;
        jenis: string;
    };

    opd?: {
        id: number;
        opd: string;
        alias: string;
    };

    asbTipeBangunan?: {
        id: number;
        tipe_bangunan: string;
    };

    asbKlasifikasi?: {
        id: number;
        klasifikasi: string;
    };

    verifikatorAdpem?: {
        id: number;
        username: string;
    } | null;

    verifikatorBPKAD?: {
        id: number;
        username: string;
    } | null;

    verifikatorBappeda?: {
        id: number;
        username: string;
    } | null;

    rejectVerifikator?: {
        id: number;
        username: string;
    } | null;

    asbDetails?: Array<{
        id: number;
        idAsb: number | null;
        files: string;
        idAsbLantai: number | null;
        idAsbFungsiRuang: number | null;
        asbFungsiRuangKoef: number | null;
        lantaiKoef: number | null;
        luas: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        asbLantai?: {
            id: number;
            lantai: string;
            type: string;
            koef: number;
            idSatuan: number;
        } | null;
    }>;

    asbDetailReviews?: Array<{
        id: number;
        idAsbDetail: number | null;
        files: string;
        idAsbLantai: number | null;
        idAsbFungsiRuang: number | null;
        idAsb: number | null;
        asbFungsiRuangKoef: number | null;
        lantaiKoef: number | null;
        luas: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        asbLantai?: {
            id: number;
            lantai: string;
            type: string;
            koef: number;
            idSatuan: number;
        } | null;
    }>;

    asbBipekStandards?: Array<{
        id: number;
        idAsb: number | null;
        files: string;
        idAsbKomponenBangunanStd: number | null;
        bobotInput: number | null;
        calculationMethod: string | null;
        jumlahBobot: number | null;
        rincianHarga: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        asbKomponenBangunanStd?: {
            id: number;
            komponen: string;
            files: string;
            idAsbJenis: number;
            idAsbTipeBangunan: number;
        } | null;
    }>;

    asbBipekStandardReviews?: Array<{
        id: number;
        idAsbBipekStandard: number | null;
        idAsbKomponenBangunanStd: number | null;
        idAsb: number | null;
        files: string;
        bobotInput: number | null;
        calculationMethod: string | null;
        jumlahBobot: number | null;
        rincianHarga: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        asbKomponenBangunanStd?: {
            id: number;
            komponen: string;
            files: string;
            idAsbJenis: number;
            idAsbTipeBangunan: number;
        } | null;
    }>;

    asbBipekNonStds?: Array<{
        id: number;
        idAsb: number | null;
        files: string;
        idAsbKomponenBangunanNonstd: number | null;
        bobotInput: number | null;
        bobotInputProsentase: number | null;
        calculationMethod: string | null;
        jumlahBobot: number | null;
        rincianHarga: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        asbKomponenBangunanNonstd?: {
            id: number;
            komponen: string;
            files: string;
            idAsbJenis: number;
            idAsbTipeBangunan: number;
        } | null;
    }>;

    asbBipekNonStdReviews?: Array<{
        id: number;
        idAsbBipekNonStd: number;
        idAsbKomponenBangunanNonstd: number | null;
        idAsb: number | null;
        files: string;
        bobotInput: number | null;
        calculationMethod: string | null;
        bobotInputProsentase: number | null;
        jumlahBobot: number | null;
        rincianHarga: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        asbKomponenBangunanNonstd?: {
            id: number;
            komponen: string;
            files: string;
            idAsbJenis: number;
            idAsbTipeBangunan: number;
        } | null;
    }>;
}
