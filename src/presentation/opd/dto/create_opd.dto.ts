import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOpdDto {
  @IsString()
  @IsNotEmpty()
  opd!: string;

  @IsString()
  @IsNotEmpty()
  alias!: string;

  @IsNumber()
  @IsNotEmpty()
  id_user!: number;
}
