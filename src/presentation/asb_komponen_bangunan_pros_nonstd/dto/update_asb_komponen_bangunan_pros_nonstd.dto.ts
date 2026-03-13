import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAsbKomponenBangunanProsNonstdDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    @IsOptional()
    idAsbKomponenBangunanNonstd?: number;

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
