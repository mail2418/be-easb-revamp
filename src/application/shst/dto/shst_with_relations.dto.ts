export class ShstWithRelationsDto {
    id: number;
    tahun: number;
    id_asb_tipe_bangunan: number;
    id_asb_klasifikasi: number;
    id_kabkota: number;
    nominal: number;
    file: string;

    // Related entities
    asbTipeBangunan?: {
        id: number;
        tipe_bangunan: string;
    } | null;

    asbKlasifikasi?: {
        id: number;
        klasifikasi: string;
    } | null;

    kabkota?: {
        id: number;
        kode: string;
        nama: string;
        provinceId: number;
        isActive: boolean;
    } | null;
}
