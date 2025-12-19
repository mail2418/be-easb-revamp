import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateJalanJenisPemeliharaanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsNotEmpty()
    @IsString()
    jenis: string;

    @IsNotEmpty()
    @IsString()
    desc: string;

    @IsNotEmpty()
    @IsString()
    uraian: string;
}
