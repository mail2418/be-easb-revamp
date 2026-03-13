import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRekeningDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  rekening_kode!: string;

  @IsString()
  @IsNotEmpty()
  rekening_uraian!: string;
}
