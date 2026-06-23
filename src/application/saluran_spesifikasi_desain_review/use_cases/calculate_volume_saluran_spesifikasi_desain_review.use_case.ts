import { Injectable, NotFoundException } from '@nestjs/common';
import { HspkService } from '../../../domain/hspk/hspk.service';

@Injectable()
export class CalculateVolumeSaluranSpesifikasiDesainReviewUseCase {
    constructor(private readonly hspkService: HspkService) {}

    async execute(
        idHspk: number,
        lebar: number,
        tinggiReview: number,
        spasiReview: number,
    ): Promise<number> {
        const hspk = await this.hspkService.findById(idHspk);
        if (!hspk) throw new NotFoundException(`HSPK with id ${idHspk} not found`);
        const satuan = hspk.satuan;
        let volume = 0;
        if (satuan === 'Ton') volume = ((lebar * tinggiReview) / 1000) * 2;
        else if (satuan === 'M3' || satuan === 'M^3') volume = (lebar * tinggiReview) / 1000;
        else if (satuan === 'Kg')
            volume =
                7850 *
                (Math.PI / 4) *
                Math.ceil(1000 / spasiReview) *
                Math.pow(tinggiReview / 1000, 2);
        else if (satuan === 'M2' || satuan === 'M^2') volume = lebar;
        else if (satuan === 'M2*' || satuan === 'M^2*') volume = (1 * 2 * tinggiReview) / 1000;
        else if (satuan === 'Buah') volume = 1000 / spasiReview;
        return volume;
    }
}
