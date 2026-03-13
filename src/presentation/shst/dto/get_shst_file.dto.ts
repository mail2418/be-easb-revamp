import { IsNumber, IsNotEmpty } from "class-validator";

export class GetShstFileDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
