import { IsNumber, IsOptional, Min, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbKlasifikasisDto {
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    page!: number;

    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    amount!: number;

    @IsOptional()
    @IsString()
    search?: string;
}
