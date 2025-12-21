import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRekeningDto {
  @IsString()
  @IsNotEmpty()
  rekening_kode!: string;

  @IsString()
  @IsNotEmpty()
  rekening_uraian!: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  bulan!: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  tahun!: number;
}
