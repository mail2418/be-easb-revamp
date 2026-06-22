import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class GetAsbTipeBangunanDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    page?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    amount?: number;

    @IsOptional()
    @IsString()
    search?: string;
}
