import { IsNumber, IsNotEmpty } from "class-validator";

export class GetShstDetailDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
