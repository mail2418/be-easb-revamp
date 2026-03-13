import { IsNumber } from 'class-validator';

export class DeleteAsbKomponenBangunanProsStdDto {
    @IsNumber()
    id!: number;
}
