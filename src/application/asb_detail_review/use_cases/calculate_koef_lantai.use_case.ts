import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbLantaiRepository } from '../../../domain/asb_lantai/asb_lantai.repository';

@Injectable()
export class CalculateKoefLantaiUseCase {
    constructor(private readonly asbLantaiRepository: AsbLantaiRepository) { }

    async execute(luas: number, idJenisLantai: number): Promise<number> {
        const data = await this.asbLantaiRepository.findById(idJenisLantai);

        if (!data) {
            throw new NotFoundException(
                `AsbLantai with id ${idJenisLantai} not found`,
            );
        }

        const nilaiKoef = luas * data.koef;
        return nilaiKoef;
    }
}
