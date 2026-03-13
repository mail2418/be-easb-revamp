import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateOpdDto {
    @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  opd?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  alias?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id_user?: number;
}
