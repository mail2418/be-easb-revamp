import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanJenisPemeliharaanDto {
    @IsNotEmpty()
    @IsString()
    jenis!: string;

    @IsNotEmpty()
    @IsString()
    desc!: string;

    @IsNotEmpty()
    @IsString()
    uraian!: string;
}
