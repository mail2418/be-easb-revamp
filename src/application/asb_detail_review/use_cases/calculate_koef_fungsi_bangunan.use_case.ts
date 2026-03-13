import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbFungsiRuangRepository } from '../../../domain/asb_fungsi_ruang/asb_fungsi_ruang.repository';

@Injectable()
export class CalculateKoefFungsiBangunanUseCase {
    constructor(
        private readonly asbFungsiRuangRepository: AsbFungsiRuangRepository,
    ) { }

    async execute(luas: number, idFungsiLantai: number): Promise<number> {
        const data = await this.asbFungsiRuangRepository.findById(
            idFungsiLantai,
        );

        if (!data) {
            throw new NotFoundException(
                `AsbFungsiRuang with id ${idFungsiLantai} not found`,
            );
        }

        const nilaiKoef = luas * data.koef;
        return nilaiKoef;
    }
}
