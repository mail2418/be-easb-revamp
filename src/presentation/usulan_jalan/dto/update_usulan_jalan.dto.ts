import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idUsulanJalan: number;

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

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idSpesifikasiDesainLentur?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idSpesifikasiDesainLenturReview?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idSpesifikasiDesainKaku?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idSpesifikasiDesainKakuReview?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idRuangLingkupPerkerasanLentur?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idRuangLingkupPerkerasanLenturReview?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idRuangLingkupPerkerasanKaku?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idRuangLingkupPerkerasanKakuReview?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idMutuBeton?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idMutuBetonReview?: number;

    @IsOptional()
    @IsString()
    keteranganTambahan?: string;

    @IsOptional()
    @IsString()
    keteranganTambahanReview?: string;
}


