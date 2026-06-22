import { IsInt, IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyIndexUsulanSaluranDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanSaluran!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idAsbJenis!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idTipeSaluran!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idKabkota!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idKecamatan!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idKelurahan!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    tahunAnggaran!: number;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value?.trim())
    namaUsulan!: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    alamat?: string;
}
