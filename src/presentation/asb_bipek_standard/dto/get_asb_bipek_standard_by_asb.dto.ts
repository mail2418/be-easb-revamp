import { IsInt, Min, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class GetAsbBipekStandardByAsbDto {
    @IsInt()
    @Type(() => Number)
    idAsb: number;

    @IsOptional()
    @Transform(({ value }) => (value === null || value === '' ? undefined : value))
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @Transform(({ value }) => (value === null || value === '' ? undefined : value))
    @IsInt()
    @Min(1)
    @Type(() => Number)
    amount?: number;
}
