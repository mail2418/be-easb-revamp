import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class CreateJalanSaluranSmkkDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id_jenis_usulan!: number;

    @IsNotEmpty()
    @IsString()
    no_mata_pembayaran!: string;

    @IsNotEmpty()
    @IsString()
    satuan!: string;

    @IsNotEmpty()
    @IsString()
    uraian!: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    pengali!: number;
}

