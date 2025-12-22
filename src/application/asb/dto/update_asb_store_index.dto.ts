import { IsInt, IsNotEmpty, IsString, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbStoreIndexDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id: number;

    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    tahunAnggaran: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    namaAsb: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    alamat: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    totalLantai: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    luasTanah?: number;

    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idAsbTipeBangunan: number;

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
    jumlahKontraktor: number;

    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idAsbJenis: number;

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idOpd?: number;

    // Internal use
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbStatus?: number;
}
