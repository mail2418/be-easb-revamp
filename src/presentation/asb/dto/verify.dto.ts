import { IsNotEmpty, IsNumber } from "class-validator";

export class VerifyDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;
}