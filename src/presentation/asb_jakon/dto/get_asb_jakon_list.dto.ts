import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbJakonListDto {
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
