import { Files } from '../asb_detail/files.enum';

export class AsbDetailReview {
    id: number;
    idAsb: number | null;
    idAsbDetail: number | null;
    files: Files;
    idAsbLantai: number | null;
    idAsbFungsiRuang: number | null;
    asbFungsiRuangKoef: number | null;
    lantaiKoef: number | null;
    luas: number | null;
}
