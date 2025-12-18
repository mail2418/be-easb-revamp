import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class RejectDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_asb!: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    reject_reason!: string;
}