import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbAnalyticsFilterDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(12)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    bulan?: number;

    @IsOptional()
    @IsNumber()
    @Min(2000)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    tahun?: number;
}

