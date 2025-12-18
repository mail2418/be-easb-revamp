import { IsNumber, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetOpdsDto {
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
}
