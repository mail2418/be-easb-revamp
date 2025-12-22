import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class StoreInformasiUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idKabkota: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idKecamatan?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idKelurahan?: number;

    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    tahunAnggaran: number;

    @IsString()
    @IsNotEmpty()
    namaUsulanJalan: string;

    @IsString()
    @IsNotEmpty()
    alamat: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    lebarJalan: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    lebarJalanReview?: number;

    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idJalanJenisPerkerasan: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idJalanJenisPerkerasanReview?: number;
}


