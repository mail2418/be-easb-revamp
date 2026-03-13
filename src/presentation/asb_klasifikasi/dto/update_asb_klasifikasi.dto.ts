import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAsbKlasifikasiDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsNumber()
  @IsOptional()
  id_asb_tipe_bangunan?: number;

  @IsString()
  @IsOptional()
  klasifikasi?: string;
}
