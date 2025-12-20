import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateJalanSpesifikasiDesainDto {
    @IsNotEmpty()
    @IsString()
    kode!: string;

    @IsNotEmpty()
    @IsString()
    uraian!: string;

    @IsNotEmpty()
    @IsString()
    satuan!: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    harga_satuan!: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    tinggi!: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    spasi?: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    harga_total!: number;
}
