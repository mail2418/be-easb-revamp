import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanRuangLingkupDto {
    @IsNotEmpty()
    @IsString()
    ruang_lingkup!: string;
}
