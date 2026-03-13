import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RejectDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;

    @IsString()
    @IsNotEmpty()
    reject_reason: string;
}