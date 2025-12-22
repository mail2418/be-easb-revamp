import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateUsulanJalanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    // Optional Foreign Keys
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idOpd?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalanStatus?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idAsbJenis?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idJalanJenisPemeliharaan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idJalanJenisPerkerasan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idRekening?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idRekeningReview?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idKabkota?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idKecamatan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idKelurahan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idVerifikatorAdbang?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idVerifikatorBpkad?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idVerifikatorBappeda?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idRejectVerif?: number;

    // Core Fields
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isIncludePpn?: boolean;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    tahunAnggaran?: number;

    @IsOptional()
    @IsString()
    namaUsulan?: string;

    @IsOptional()
    @IsString()
    uraian?: string;

    @IsOptional()
    @IsString()
    spesifikasi?: string;

    @IsOptional()
    @IsString()
    satuan?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    hargaSatuan?: number;

    @IsOptional()
    @IsString()
    deskripsiDesain?: string;
}
