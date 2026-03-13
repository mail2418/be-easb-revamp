export class AsbDetailWithRelationDto {
    id: number;
    id_asb_lantai: number;
    id_asb_fungsi_ruang: number;
    asb_fungsi_ruang_koef: number;
    lantai_koef: number;
    luas: number;
    asb_lantai: {
        id: number;
        lantai: string;
        koef: number;
    };
    asb_fungsi_ruang: {
        id: number;
        fungsi_ruang: string;
        koef: number;
    };
}