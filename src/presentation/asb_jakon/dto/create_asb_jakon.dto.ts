import { IsNumber, IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

export class CreateAsbJakonDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbTipeBangunan!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbJenis!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbKlasifikasi!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    tahun!: number;

    @IsEnum(AsbJakonType)
    @IsNotEmpty()
    type!: AsbJakonType;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    nama!: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    spec!: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    priceFrom!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    priceTo!: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    satuan!: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    standard!: number;
}
