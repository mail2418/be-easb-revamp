import { IsNumber, IsNotEmpty } from "class-validator";

export class GetAsbTipeBangunanDetailDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}