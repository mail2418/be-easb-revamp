import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRekeningDto {
  @IsString()
  @IsNotEmpty()
  rekening_kode!: string;

  @IsString()
  @IsNotEmpty()
  rekening_uraian!: string;
}
