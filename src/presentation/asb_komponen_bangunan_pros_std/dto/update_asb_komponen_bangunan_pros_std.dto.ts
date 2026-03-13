import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAsbKomponenBangunanProsStdDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    @IsOptional()
    idAsbKomponenBangunanStd?: number;

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
