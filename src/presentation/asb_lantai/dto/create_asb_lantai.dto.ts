import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAsbLantaiDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  lantai!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  type!: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  koef!: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  id_satuan!: number;
}
