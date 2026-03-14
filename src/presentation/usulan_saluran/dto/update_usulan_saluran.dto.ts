import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateUsulanSaluranDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idUsulanSaluranStatus?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbJenis?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idTipeSaluran?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idRekening?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idRekeningReview?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idKabkota?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idKecamatan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idKelurahan?: number;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isIncludePpn?: boolean;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    tahunAnggaran?: number;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    namaUsulan?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    alamat?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    uraian?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    spesifikasi?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    satuan?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    deskripsiDesain?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value != null && value !== '') ? String(value).trim() : undefined)
    keteranganTambahan?: string;
}
