import { IsInt, IsOptional, Min, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetKecamatansDto {
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

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    idKabkota?: number;

    @IsString()
    @IsOptional()
    search?: string;
}
