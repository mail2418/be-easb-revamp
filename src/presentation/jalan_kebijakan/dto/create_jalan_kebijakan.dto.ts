import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class CreateJalanKebijakanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idKabkota!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    bulan!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    tahun!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    nilai_ppn!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    nilai_smkk!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    suku_bunga!: number;
}
