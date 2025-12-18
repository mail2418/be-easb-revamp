import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbLantaiDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  id!: number;

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
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  koef!: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  id_satuan!: number;
}
