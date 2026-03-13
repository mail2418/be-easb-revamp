import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllAsbDto {
    // Pagination (required)
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    page!: number;

    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    amount!: number;

    // Filters (optional)
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    idAsbJenis?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    idAsbStatus?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    idTipeBangunan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    tahunAnggaran?: number;

    @IsOptional()
    @IsString()
    namaAsb?: string;
}
