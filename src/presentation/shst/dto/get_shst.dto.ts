import { IsNumber, IsNotEmpty, Min, IsOptional } from "class-validator";

export class GetShstDto {
  @IsNumber()
  @Min(1)
  page!: number;

  @IsNumber()
  @Min(1)
  amount!: number;

  @IsOptional()
  @IsNumber()
  tahun?: number;

  @IsOptional()
  @IsNumber()
  id_asb_tipe_bangunan?: number;

  @IsOptional()
  @IsNumber()
  id_asb_klasifikasi?: number;

  @IsOptional()
  @IsNumber()
  id_kabkota?: number;
}
