import { IsNumber, IsNotEmpty } from "class-validator";

export class DeleteAsbStatusDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}