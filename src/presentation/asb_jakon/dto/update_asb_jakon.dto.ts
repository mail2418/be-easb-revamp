import { IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

export class UpdateAsbJakonDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    @IsOptional()
    idAsbTipeBangunan?: number;

    @IsNumber()
    @IsOptional()
    idAsbJenis?: number;

    @IsNumber()
    @IsOptional()
    idAsbKlasifikasi?: number;

    @IsNumber()
    @IsOptional()
    tahun?: number;

    @IsEnum(AsbJakonType)
    @IsOptional()
    type?: AsbJakonType;

    @IsString()
    @IsOptional()
    nama?: string;

    @IsString()
    @IsOptional()
    spec?: string;

    @IsNumber()
    @IsOptional()
    priceFrom?: number;

    @IsNumber()
    @IsOptional()
    priceTo?: number;

    @IsString()
    @IsOptional()
    satuan?: string;

    @IsNumber()
    @IsOptional()
    standard?: number;
}
