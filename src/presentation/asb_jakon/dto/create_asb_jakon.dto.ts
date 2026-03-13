import { IsNumber, IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

export class CreateAsbJakonDto {
    @IsNumber()
    @IsNotEmpty()
    idAsbTipeBangunan!: number;

    @IsNumber()
    @IsNotEmpty()
    idAsbJenis!: number;

    @IsNumber()
    @IsNotEmpty()
    idAsbKlasifikasi!: number;

    @IsNumber()
    @IsNotEmpty()
    tahun!: number;

    @IsEnum(AsbJakonType)
    @IsNotEmpty()
    type!: AsbJakonType;

    @IsString()
    @IsNotEmpty()
    nama!: string;

    @IsString()
    @IsNotEmpty()
    spec!: string;

    @IsNumber()
    @IsNotEmpty()
    priceFrom!: number;

    @IsNumber()
    @IsNotEmpty()
    priceTo!: number;

    @IsString()
    @IsNotEmpty()
    satuan!: string;

    @IsNumber()
    @IsNotEmpty()
    standard!: number;
}
