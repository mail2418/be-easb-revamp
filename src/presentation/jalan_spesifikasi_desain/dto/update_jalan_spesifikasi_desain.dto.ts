import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateJalanSpesifikasiDesainDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id!: number;

    @IsNotEmpty()
    @IsString()
    kode: string;

    @IsNotEmpty()
    @IsString()
    uraian: string;

    @IsNotEmpty()
    @IsString()
    satuan: string;

    @IsNotEmpty()
    @IsNumber()
    harga_satuan: number;

    @IsNotEmpty()
    @IsNumber()
    tinggi: number;

    @IsOptional()
    @IsNumber()
    spasi: number;

    @IsNotEmpty()
    @IsNumber()
    harga_total: number;
}
