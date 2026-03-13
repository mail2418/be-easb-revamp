import { Files } from '../asb_detail/files.enum';
import { CalculationMethod } from './calculation_method.enum';

export class AsbBipekStandard {
    id: number;
    idAsb: number | null;
    files: Files;
    idAsbKomponenBangunanStd: number | null;
    bobotInput: number | null;
    calculationMethod: CalculationMethod | null;
    jumlahBobot: number | null;
    rincianHarga: number | null;
}
