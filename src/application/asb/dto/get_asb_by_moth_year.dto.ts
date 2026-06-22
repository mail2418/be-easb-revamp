import { IsNumber, IsNotEmpty, Min, Max } from "class-validator";
import { Transform } from "class-transformer";

export class GetAsbByMonthYearDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(12)
    @Transform(({ value }) => parseInt(value, 10))
    month!: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(2000)
    @Transform(({ value }) => parseInt(value, 10))
    year!: number;
}