import { IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

export class UpdateAsbJakonDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseInt(value, 10) : undefined)
    idAsbTipeBangunan?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseInt(value, 10) : undefined)
    idAsbJenis?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseInt(value, 10) : undefined)
    idAsbKlasifikasi?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseInt(value, 10) : undefined)
    tahun?: number;

    @IsEnum(AsbJakonType)
    @IsOptional()
    type?: AsbJakonType;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    nama?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    spec?: string;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    priceFrom?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    priceTo?: number;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    satuan?: string;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    standard?: number;
}
