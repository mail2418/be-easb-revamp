import { Injectable } from '@nestjs/common';
import { SmkkGlobalService } from '../../../domain/smkk_global/smkk_global.service';

@Injectable()
export class CalculateBiayaSmkkUseCase {
    constructor(private readonly smkkGlobalService: SmkkGlobalService) { }

    async execute(totalHarga: number): Promise<number | null> {
        try {
            // Get latest SMKK Global persentase
            const latestPersentaseSmkk = await this.smkkGlobalService.getLatestPersentaseSmkk();
            // If no latest SMKK Global found, return null
            if (latestPersentaseSmkk === null) {
                return null;
            }

            // Calculate: biaya_smkk = totalHarga * persentase_smkk
            // persentase_smkk is already in decimal format (e.g., 0.02 for 2%)
            const biayaSmkk = totalHarga * latestPersentaseSmkk;

            return biayaSmkk;
        } catch (error) {
            throw error;
        }
    }
}

