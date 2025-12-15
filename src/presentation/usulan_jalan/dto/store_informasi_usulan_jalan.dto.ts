import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class StoreInformasiUsulanJalanDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idOpd?: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idKabkota: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idKecamatan?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idKelurahan?: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    tahunAnggaran: number;

    @IsString()
    @IsNotEmpty()
    namaUsulanJalan: string;

    @IsString()
    @IsNotEmpty()
    alamat: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    lebarJalan: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    lebarJalanReview?: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idJalanJenisPerkerasan: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idJalanJenisPerkerasanReview?: number;
}


