import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class GetPpnGlobalDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    page?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    amount?: number;
}
