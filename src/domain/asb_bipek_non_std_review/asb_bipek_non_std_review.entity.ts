import { Files } from '../asb_detail/files.enum';

export class AsbBipekNonStdReview {
    id: number;
    idAsb: number | null;
    idASbBipekNonStd: number | null;
    idAsbKomponenBangunanNonstd: number | null;
    files: Files;
    bobotInput: number | null;
    calculationMethod: string | null;
    bobotInputProsentase: number | null;
    jumlahBobot: number | null;
    rincianHarga: number | null;
}
