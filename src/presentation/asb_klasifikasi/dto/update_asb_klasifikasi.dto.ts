import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbKlasifikasiDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  id!: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  id_asb_tipe_bangunan?: number;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  klasifikasi?: string;
}
