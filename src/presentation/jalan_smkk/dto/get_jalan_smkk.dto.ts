import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class GetJalanSmkkDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    page?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    amount?: number;
}
