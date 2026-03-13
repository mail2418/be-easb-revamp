import { Files } from './files.enum';

export class AsbDetail {
    id: number;
    idAsb: number | null;
    files: Files;
    idAsbLantai: number | null;
    idAsbFungsiRuang: number | null;
    asbFungsiRuangKoef: number | null;
    lantaiKoef: number | null;
    luas: number | null;
}
