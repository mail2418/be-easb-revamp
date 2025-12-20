import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class CreateJalanSmkkDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    bulan!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    tahun!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    persentase_smkk!: number;
}
