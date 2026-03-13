import { CalculationMethod } from "src/domain/asb_bipek_standard/calculation_method.enum";
import { Files } from "src/domain/asb_detail/files.enum";

export class BpnsReviewWithRelationsDto {
    id: number;
    idAsbBipekNonStd: number;
    idAsbKomponenBangunanNonstd: number;
    files: Files;
    bobotInput: number;
    calculationMethod: CalculationMethod;
    jumlahBobot: number;
    rincianHarga: number;

    // Related entities
    asbKomponenBangunanNonstd?: {
        id: number;
        komponen: string;
    };
}