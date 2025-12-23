import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class StoreInformasiUsulanJalanDto {
    // Required Foreign Keys
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idOpd!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalanStatus!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idAsbJenis!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idRekening!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idRekeningReview!: number;

    // Optional Foreign Keys - Jalan
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idJalanJenisPemeliharaan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idJalanJenisPerkerasan?: number;

    // Optional Foreign Keys - Location
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

    // Optional Foreign Keys - Verifikators
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
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    isIncludePpn?: boolean;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    tahunAnggaran!: number;

    @IsString()
    @IsNotEmpty()
    namaUsulan!: string;

    @IsString()
    @IsNotEmpty()
    uraian!: string;

    @IsString()
    @IsNotEmpty()
    spesifikasi!: string;

    @IsString()
    @IsNotEmpty()
    satuan!: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value))
    hargaSatuan!: number;

    @IsString()
    @IsNotEmpty()
    deskripsiDesain!: string;
}


