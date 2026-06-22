import { IsNotEmpty, IsString } from "class-validator";

export class CreateJenisUsulanDto {
    @IsNotEmpty()
    @IsString()
    jenis!: string;
}
