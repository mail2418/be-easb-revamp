import { IsString, IsNotEmpty } from "class-validator";

export class CreateAsbStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: string;
}
