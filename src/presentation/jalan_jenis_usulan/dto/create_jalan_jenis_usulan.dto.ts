import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanJenisUsulanDto {
    @IsNotEmpty()
    @IsString()
    jenis_usulan!: string;
}
