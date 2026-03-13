import { CalculationMethod } from "src/domain/asb_bipek_standard/calculation_method.enum";
import { Files } from "src/domain/asb_detail/files.enum";

export class BpsReviewWithRelationsDto {
    id: number;
    idAsbBipekStandard: number;
    idAsbKomponenBangunanStd: number;
    files: Files;
    bobotInput: number;
    calculationMethod: CalculationMethod;
    jumlahBobot: number;
    rincianHarga: number;

    // Related entities
    asbKomponenBangunanStd?: {
        id: number;
        komponen: string;
    };
}