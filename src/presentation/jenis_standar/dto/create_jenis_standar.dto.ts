import { IsString, IsNotEmpty } from "class-validator";

export class CreateJenisStandarDto {
  @IsString()
  @IsNotEmpty()
  jenis!: string;
}
