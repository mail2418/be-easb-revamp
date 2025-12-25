import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateSpesifikasiUsulanJalanUseCase {
    async execute(
        tinggiValues: number[],
        idJenisPerkerasan: number | null,
    ): Promise<string> {
        // Generate spesifikasi: "Tebal Perkerasan {MIN} mm - {MAX} mm; (Dengan/Tanpa) Lapis Pondasi."
        const minTinggi = tinggiValues.length > 0 ? Math.min(...tinggiValues) : 0;
        const maxTinggi = tinggiValues.length > 0 ? Math.max(...tinggiValues) : 0;
        const lapisPondasi = (idJenisPerkerasan === 3 || idJenisPerkerasan === 6) ? 'Dengan' : 'Tanpa';
        
        return `Tebal Perkerasan ${minTinggi} mm - ${maxTinggi} mm; ${lapisPondasi} Lapis Pondasi.`;
    }
}

