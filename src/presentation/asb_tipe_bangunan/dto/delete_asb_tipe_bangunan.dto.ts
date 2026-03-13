import { IsNumber, IsNotEmpty } from "class-validator";

export class DeleteAsbTipeBangunanDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
