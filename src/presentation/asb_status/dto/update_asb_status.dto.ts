import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateAsbStatusDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  id!: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  status!: string;
}
