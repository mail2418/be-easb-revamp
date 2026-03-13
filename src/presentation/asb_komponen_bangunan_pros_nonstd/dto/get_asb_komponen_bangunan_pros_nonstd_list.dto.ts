import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetAsbKomponenBangunanProsNonstdListDto {
    @IsNumber()
    @IsNotEmpty()
    page!: number;

    @IsNumber()
    @IsNotEmpty()
    amount!: number;
}
