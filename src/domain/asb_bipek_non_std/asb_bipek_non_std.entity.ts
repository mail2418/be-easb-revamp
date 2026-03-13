import { Files } from '../asb_detail/files.enum';

export class AsbBipekNonStd {
    id: number;
    idAsb: number | null;
    files: Files;
    idAsbKomponenBangunanNonstd: number | null;
    bobotInput: number | null;
    bobotInputProsentase: number | null;
    calculationMethod: string | null;
    jumlahBobot: number | null;
    rincianHarga: number | null;
}
