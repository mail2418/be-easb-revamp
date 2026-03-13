import { IsNumber, IsNotEmpty, IsPositive } from "class-validator";

export class CreateShstDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  tahun!: number;

  @IsNumber()
  @IsNotEmpty()
  id_asb_tipe_bangunan!: number;

  @IsNumber()
  @IsNotEmpty()
  id_asb_klasifikasi!: number;

  @IsNumber()
  @IsNotEmpty()
  id_kabkota!: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  nominal!: number;
}
