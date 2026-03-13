import { IsInt, IsOptional, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetKecamatansDto {

    @IsInt()
    @Min(1)
    @Type(() => Number)
    @IsOptional()
    page: number = 1;


    @IsInt()
    @Min(1)
    @Type(() => Number)
    @IsOptional()
    amount: number = 10;


    @IsInt()
    @Type(() => Number)
    @IsOptional()
    idKabkota?: number;


    @IsString()
    @IsOptional()
    search?: string;
}
