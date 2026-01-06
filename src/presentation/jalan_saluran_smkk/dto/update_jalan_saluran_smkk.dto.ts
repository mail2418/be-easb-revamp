import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateJalanSaluranSmkkDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_ruang_lingkup?: number;

    @IsOptional()
    @IsString()
    no_mata_pembayaran?: string;

    @IsOptional()
    @IsString()
    satuan?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value !== null && value !== undefined ? parseFloat(value) : null)
    harga_satuan?: number | null;

    @IsOptional()
    @IsString()
    uraian?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    pengali?: number;
}

