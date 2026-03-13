import { IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class GetAsbByMonthYearDto {
    @IsNumber()
    @Type(() => Number)
    month: number;

    @IsNumber()
    @Type(() => Number)
    year: number;
}