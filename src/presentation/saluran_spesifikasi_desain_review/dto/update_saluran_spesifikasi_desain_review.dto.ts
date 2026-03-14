import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateSaluranSpesifikasiDesainReviewDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_usulan_saluran?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_ruang_lingkup?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_hspk?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    volume_review?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    spasi_review?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    tinggi_review?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    harga_spec_review?: number;

    @IsOptional()
    @IsString()
    keterangan_tambahan_review?: string;
}
