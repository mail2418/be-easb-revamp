import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateJalanSpesifikasiDesainReviewDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id_spesifikasi_desain?: number;

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
    volume_review?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    lebar_review?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    spasi_review?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    tinggi_review?: number;
}
