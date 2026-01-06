import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class CreateJalanSaluranSmkkDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id_ruang_lingkup!: number;

    @IsNotEmpty()
    @IsString()
    no_mata_pembayaran!: string;

    @IsNotEmpty()
    @IsString()
    satuan!: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : null)
    harga_satuan?: number | null;

    @IsNotEmpty()
    @IsString()
    uraian!: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    pengali!: number;
}

