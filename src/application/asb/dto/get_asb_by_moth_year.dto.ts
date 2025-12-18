import { IsNumber, IsNotEmpty, Min, Max } from "class-validator";
import { Transform } from "class-transformer";

export class GetAsbByMonthYearDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(12)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    month!: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(2000)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    year!: number;
}