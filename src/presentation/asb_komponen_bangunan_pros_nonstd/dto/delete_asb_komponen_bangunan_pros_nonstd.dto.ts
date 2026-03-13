import { IsNumber } from 'class-validator';

export class DeleteAsbKomponenBangunanProsNonstdDto {
    @IsNumber()
    id!: number;
}
