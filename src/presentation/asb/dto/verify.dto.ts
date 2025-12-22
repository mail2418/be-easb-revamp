import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class VerifyDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb!: number;
}