import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';
import { KomponenProsWeights } from '../../asb_komponen_bangunan_pros/default_komponen_pros';

export function getBobotAcuanFromPros(
    pros: KomponenProsWeights,
    calculationMethod: CalculationMethod,
): number {
    if (calculationMethod === CalculationMethod.AVG_MIN) {
        return pros.avgMin || 0;
    }
    if (calculationMethod === CalculationMethod.AVG_MAX) {
        return pros.avgMax || 0;
    }
    if (calculationMethod === CalculationMethod.MAX) {
        return pros.max || 0;
    }
    return pros.avg || 0;
}
