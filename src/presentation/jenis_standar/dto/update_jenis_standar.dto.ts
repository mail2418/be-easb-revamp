import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateJenisStandarDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  jenis!: string;
}
