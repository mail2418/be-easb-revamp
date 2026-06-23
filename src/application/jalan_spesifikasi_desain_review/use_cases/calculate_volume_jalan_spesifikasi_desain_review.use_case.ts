import { Injectable, NotFoundException } from '@nestjs/common';
import { HspkService } from '../../../domain/hspk/hspk.service';

@Injectable()
export class CalculateVolumeJalanSpesifikasiDesainReviewUseCase {
    constructor(private readonly hspkService: HspkService) {}

    async execute(
        idHspk: number,
        lebar: number,
        tinggiReview: number,
        spasiReview: number,
    ): Promise<number> {
        // Get HSPK data to get satuan
        const hspk = await this.hspkService.findById(idHspk);

        if (!hspk) {
            throw new NotFoundException(`HSPK with id ${idHspk} not found`);
        }

        const satuan = hspk.satuan;
        let volume = 0;

        // Calculate volume based on satuan
        if (satuan === 'Ton') {
            volume = ((lebar * tinggiReview) / 1000) * 2;
        } else if (satuan === 'M^3') {
            volume = (lebar * tinggiReview) / 1000;
        } else if (satuan === 'Kg') {
            const pi = Math.PI;
            volume =
                7850 * (pi / 4) * Math.ceil(1000 / spasiReview) * Math.pow(tinggiReview / 1000, 2);
        } else if (satuan === 'M^2') {
            volume = lebar;
        } else if (satuan === 'M^2*') {
            volume = (1 * 2 * tinggiReview) / 1000;
        } else if (satuan === 'Buah') {
            volume = 1000 / spasiReview;
        } else {
            volume = 0;
        }

        return volume;
    }
}
