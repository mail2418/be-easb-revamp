import { IsNumber, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class DeleteAsbTipeBangunanDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  id!: number;
}
