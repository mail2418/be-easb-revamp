import { Verifikator } from '../../../domain/verifikator/verifikator.entity';

export class VerifikatorsPaginationResultDto {
    data!: Verifikator[];
    total!: number;
    page!: number;
    amount!: number;
    totalPages!: number;
}

