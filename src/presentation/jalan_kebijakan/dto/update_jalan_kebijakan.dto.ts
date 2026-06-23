import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateJalanKebijakanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idKabkota?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    bulan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    tahun?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseFloat(value) : undefined))
    nilai_ppn?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseFloat(value) : undefined))
    nilai_smkk?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseFloat(value) : undefined))
    suku_bunga?: number;
}
