import { IsNumber, IsNotEmpty } from "class-validator";

export class GetJenisStandarDetailDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
