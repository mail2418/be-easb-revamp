import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbJakonListDto {
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    page!: number;

    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    amount!: number;

    // optional filters could be added here

    @IsOptional()
    @IsString()
    search?: string;
}
