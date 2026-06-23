import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllAsbDto {
    // Pagination
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    page?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    amount?: number;

    // Filters (optional)
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idAsbJenis?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idAsbStatus?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idTipeBangunan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    tahunAnggaran?: number;

    @IsOptional()
    @IsString()
    namaAsb?: string;
}
