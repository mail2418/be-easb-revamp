import { IsNumber, IsNotEmpty, IsString, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetShstDto {
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

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    tahun?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    id_asb_tipe_bangunan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    id_asb_klasifikasi?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    id_kabkota?: number;

    @IsOptional()
    @IsString()
    search?: string;
}
