import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateJalanSaluranRuangLingkupDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_jenis_usulan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    nomor_divisi?: number;

    @IsOptional()
    @IsString()
    deskripsi_divisi?: string;
}
