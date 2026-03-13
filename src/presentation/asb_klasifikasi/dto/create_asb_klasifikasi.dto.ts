import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateAsbKlasifikasiDto {
  @IsNumber()
  @IsNotEmpty()
  id_asb_tipe_bangunan!: number;

  @IsString()
  @IsNotEmpty()
  klasifikasi!: string;
}
