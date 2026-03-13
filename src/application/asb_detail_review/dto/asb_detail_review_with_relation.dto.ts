export class AsbDetailReviewWithRelationDto {
    id: number;
    id_asb_detail: number | null;
    id_asb_lantai: number | null;
    id_asb_fungsi_ruang: number | null;
    asb_fungsi_ruang_koef: number | null;
    lantai_koef: number | null;
    luas: number | null;
    asb_lantai: {
        id: number | null;
        lantai: string;
        koef: number;
    };
    asb_fungsi_ruang: {
        id: number | null;
        fungsi_ruang: string;
        koef: number;
    };
}