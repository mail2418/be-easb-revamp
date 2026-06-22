import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, Min, IsOptional, IsString } from "class-validator";

export class GetAsbTipeBangunanDto {
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page!: number;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    amount!: number;

    @IsOptional()
    @IsString()
    search?: string;
}
