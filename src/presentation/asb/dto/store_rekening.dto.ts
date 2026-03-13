import { IsNumber } from 'class-validator';

export class StoreRekeningDto {
    @IsNumber()
    id_asb: number;

    @IsNumber()
    id_rekening: number;
}
