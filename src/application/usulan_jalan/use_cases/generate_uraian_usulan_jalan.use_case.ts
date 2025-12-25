import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateUraianUsulanJalanUseCase {
    async execute(
        jenisPerkerasan: string,
        lebar: number,
    ): Promise<string> {
        // Generate uraian: "1 m^1 $jalan_jenis_perkerasan.jenis_perkerasan Lebar $usulan_jalan.lebar meter"
        return `1 m^1 ${jenisPerkerasan} Lebar ${lebar} meter`;
    }
}

