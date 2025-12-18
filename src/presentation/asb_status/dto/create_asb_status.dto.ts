import { IsString, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class CreateAsbStatusDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  status!: string;
}
