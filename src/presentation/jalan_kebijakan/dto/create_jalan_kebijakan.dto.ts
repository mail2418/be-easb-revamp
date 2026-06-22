import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class CreateJalanKebijakanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idKabkota!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    bulan!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    tahun!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    nilai_ppn!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    nilai_smkk!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    suku_bunga!: number;
}
