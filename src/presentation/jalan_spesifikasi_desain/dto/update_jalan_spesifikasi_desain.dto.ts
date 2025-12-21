import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateJalanSpesifikasiDesainDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id_usulan_jalan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id_ruang_lingkup?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id_hspk?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    volume?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    lebar?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    spasi?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    tinggi?: number;
}
