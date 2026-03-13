import { IsInt, IsOptional, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetKelurahansDto {
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
    idKecamatan?: number;

    @IsString()
    @IsOptional()
    search?: string;
}
