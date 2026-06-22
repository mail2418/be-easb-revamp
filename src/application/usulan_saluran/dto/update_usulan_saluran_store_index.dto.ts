import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUsulanSaluranStoreIndexDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

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
}
