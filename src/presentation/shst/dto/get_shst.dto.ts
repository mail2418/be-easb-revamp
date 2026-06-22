import { IsNumber, IsNotEmpty, Min, IsOptional, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class GetShstDto {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page!: number;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  amount!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === undefined || value === '' ? undefined : parseInt(value, 10)))
  tahun?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === undefined || value === '' ? undefined : parseInt(value, 10)))
  id_asb_tipe_bangunan?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === undefined || value === '' ? undefined : parseInt(value, 10)))
  id_asb_klasifikasi?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === undefined || value === '' ? undefined : parseInt(value, 10)))
  id_kabkota?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
