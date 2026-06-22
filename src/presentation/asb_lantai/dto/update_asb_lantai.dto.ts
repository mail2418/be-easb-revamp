import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAsbLantaiDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  lantai!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsNumber()
  @IsNotEmpty()
  koef!: number;

  @IsNumber()
  @IsNotEmpty()
  id_satuan!: number;
}
