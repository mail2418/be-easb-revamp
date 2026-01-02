import { IsNumber, IsEnum, IsString, IsNotEmpty, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

export class UpdateAsbJakonDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    idAsbTipeBangunan!: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    idAsbJenis!: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    idAsbKlasifikasi!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
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
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    priceFrom!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    priceTo!: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    satuan!: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    standard!: number;
}
