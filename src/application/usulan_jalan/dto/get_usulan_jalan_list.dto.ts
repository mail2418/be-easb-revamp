import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUsulanJalanListDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => value === undefined ? undefined : parseInt(value, 10))
    page?: number;
    
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => value === undefined ? undefined : parseInt(value, 10))
    amount?: number;
}