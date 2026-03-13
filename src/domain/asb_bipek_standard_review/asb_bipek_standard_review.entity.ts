import { Files } from '../asb_detail/files.enum';
import { CalculationMethod } from '../asb_bipek_standard/calculation_method.enum';

export class AsbBipekStandardReview {
    id: number;
    idAsb: number | null;
    idAsbBipekStandard: number | null;
    idAsbKomponenBangunanStd: number | null;
    files: Files;
    bobotInput: number | null;
    calculationMethod: CalculationMethod | null;
    jumlahBobot: number | null;
    rincianHarga: number | null;
}
