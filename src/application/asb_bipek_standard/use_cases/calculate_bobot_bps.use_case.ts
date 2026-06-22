import { Injectable } from '@nestjs/common';
import { AsbKomponenBangunanProsStdRepository } from '../../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.repository';
import { AsbBipekStandardService } from '../../../domain/asb_bipek_standard/asb_bipek_standard.service';
import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';
import { AsbKomponenBangunanProsStd } from 'src/domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.entity';
import { AsbDetailService } from 'src/domain/asb_detail/asb_detail.service';
import { Files } from 'src/domain/asb_detail/files.enum';

@Injectable()
export class CalculateBobotBPSUseCase {
    constructor(
        private readonly asbKomponenBangunanProsStdRepository: AsbKomponenBangunanProsStdRepository,
        private readonly asbDetailService: AsbDetailService,
        private readonly asbBipekStandardService: AsbBipekStandardService,
    ) { }

    async execute(
        idAsb: number,
        komponenIds: number[],
        bobotInputs: number[],
        shst: number,
        totalLantai: number,
        koefisienLantaiTotal: number,
        koefisienFungsiRuangTotal: number,
        luasTotalBangunan: number,
    ): Promise<number[]> {
        let jumlahBobot = 0;
        let kompBangProsList: AsbKomponenBangunanProsStd[] = [];
        let calculationMethod: CalculationMethod;

        // Set calculation method
        if (totalLantai <= 2) {
            calculationMethod = CalculationMethod.AVG_MIN;
        } else if (totalLantai > 2 && totalLantai <= 4) {
            calculationMethod = CalculationMethod.AVG;
        } else if (totalLantai > 4 && totalLantai <= 8) {
            calculationMethod = CalculationMethod.AVG_MAX;
        } else {
            calculationMethod = CalculationMethod.MAX;
        }

        // Loop 1: Calculate jumlah_bobot
        for (let i = 0; i < komponenIds.length; i++) {
            if (bobotInputs[i]) {
                const asbKompBangPros = await this.asbKomponenBangunanProsStdRepository
                    .findByKomponenBangunanStdId(komponenIds[i]);

                if (asbKompBangPros) {
                    kompBangProsList[i] = asbKompBangPros;
                    let bobotAcuan = 0;

                    if (calculationMethod === CalculationMethod.AVG_MIN) {
                        bobotAcuan = asbKompBangPros.avgMin || 0;
                    } else if (calculationMethod === CalculationMethod.AVG_MAX) {
                        bobotAcuan = asbKompBangPros.avgMax || 0;
                    } else if (calculationMethod === CalculationMethod.MAX) {
                        bobotAcuan = asbKompBangPros.max || 0;
                    } else {
                        bobotAcuan = asbKompBangPros.avg || 0;
                    }

                    jumlahBobot += (bobotInputs[i] / 100) * bobotAcuan;
                }
            }
        }

        jumlahBobot = jumlahBobot > 1 ? 1 : jumlahBobot;

        // Calculate BPS
        const BPS = jumlahBobot * shst * koefisienLantaiTotal * koefisienFungsiRuangTotal * luasTotalBangunan;

        // Loop 2: Create and save AsbBipekStandard records
        for (let i = 0; i < komponenIds.length; i++) {
            if (bobotInputs[i] && kompBangProsList[i]) {
                let bobotAcuan = 0;

                if (calculationMethod === CalculationMethod.AVG_MIN) {
                    bobotAcuan = kompBangProsList[i].avgMin || 0;
                } else if (calculationMethod === CalculationMethod.AVG_MAX) {
                    bobotAcuan = kompBangProsList[i].avgMax || 0;
                } else if (calculationMethod === CalculationMethod.MAX) {
                    bobotAcuan = kompBangProsList[i].max || 0;
                } else {
                    bobotAcuan = kompBangProsList[i].avg || 0;
                }

                const bobot = (bobotInputs[i] / 100) * bobotAcuan;

                const asbBipekStandard = {
                    idAsb,
                    idAsbKomponenBangunanStd: komponenIds[i],
                    bobotInput: bobotInputs[i],
                    calculationMethod: calculationMethod,
                    jumlahBobot: bobot,
                    rincianHarga: (bobot / jumlahBobot) * BPS,
                    files: Files.ORIGIN
                };

                await this.asbBipekStandardService.create(asbBipekStandard);
            }
        }

        return [BPS, jumlahBobot];
    }
}
