import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateSpesifikasiUsulanSaluranUseCase {
    async execute(tinggiValues: number[], tipeSaluran: string): Promise<string> {
        const minTinggi = tinggiValues.length > 0 ? Math.min(...tinggiValues) : 0;
        const maxTinggi = tinggiValues.length > 0 ? Math.max(...tinggiValues) : 0;
        return `Tebal saluran ${minTinggi}-${maxTinggi} mm; Dengan tipe ${tipeSaluran}`;
    }
}
