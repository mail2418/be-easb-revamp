import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAsbKomponenBangunanProsStdDto {
    @IsNumber()
    @IsNotEmpty()
    idAsbKomponenBangunanStd!: number;

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
