import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAsbFungsiRuangDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  nama_fungsi_ruang!: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  koef!: number;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  isActive!: boolean;
}
