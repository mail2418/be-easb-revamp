import { IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllUsulanSaluranDto {
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    page?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    amount?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idUsulanSaluranStatus?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    tahunAnggaran?: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    namaUsulanSaluran?: string;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idKabkota?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idKecamatan?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idKelurahan?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idTipeSaluran?: number;
}
