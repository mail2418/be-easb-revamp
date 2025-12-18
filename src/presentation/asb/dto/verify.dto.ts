import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class VerifyDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_asb!: number;
}