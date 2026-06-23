import { IsInt, IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyIndexUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idAsbJenis!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idJalanJenisPemeliharaan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idJalanJenisPerkerasan?: number;

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
