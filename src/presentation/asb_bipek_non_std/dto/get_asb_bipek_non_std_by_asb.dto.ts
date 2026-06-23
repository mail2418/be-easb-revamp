import { IsInt, Min, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbBipekNonStdByAsbDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idAsb: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    amount?: number;
}
