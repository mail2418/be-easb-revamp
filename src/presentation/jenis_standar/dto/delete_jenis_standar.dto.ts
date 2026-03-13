import { IsNumber, IsNotEmpty } from "class-validator";

export class DeleteJenisStandarDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
