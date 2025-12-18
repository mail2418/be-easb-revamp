import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbKomponenBangunanProsStdDto {
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id!: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseInt(value, 10) : undefined)
    idAsbKomponenBangunanStd?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    min?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    avgMin?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    avg?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    avgMax?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    max?: number;
}
