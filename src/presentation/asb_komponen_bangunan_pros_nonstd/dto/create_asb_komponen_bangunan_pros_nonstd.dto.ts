import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAsbKomponenBangunanProsNonstdDto {
    @IsNumber()
    @IsNotEmpty()
    idAsbKomponenBangunanNonstd!: number;

    @IsNumber()
    @IsOptional()
    min?: number;

    @IsNumber()
    @IsOptional()
    avgMin?: number;

    @IsNumber()
    @IsOptional()
    avg?: number;

    @IsNumber()
    @IsOptional()
    avgMax?: number;

    @IsNumber()
    @IsOptional()
    max?: number;
}
