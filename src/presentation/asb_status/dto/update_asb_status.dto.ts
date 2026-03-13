import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateAsbStatusDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  status!: string;
}
