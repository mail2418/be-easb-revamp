import { IsNumber } from 'class-validator';

export class GetAsbKomponenBangunanProsNonstdDetailDto {
    @IsNumber()
    id!: number;
}
