import { IsNumber } from 'class-validator';

export class GetAsbKomponenBangunanProsStdDetailDto {
    @IsNumber()
    id!: number;
}
