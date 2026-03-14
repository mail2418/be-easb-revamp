import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateUraianUsulanSaluranUseCase {
    async execute(
        tipeSaluran: string,
        lebar: number,
    ): Promise<string> {
        return `1 m^1 ${tipeSaluran} Lebar ${lebar} meter`;
    }
}
