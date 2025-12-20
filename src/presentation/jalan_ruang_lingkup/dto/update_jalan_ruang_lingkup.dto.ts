import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateJalanRuangLingkupDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id!: number;

    @IsNotEmpty()
    @IsString()
    ruang_lingkup: string;
}
