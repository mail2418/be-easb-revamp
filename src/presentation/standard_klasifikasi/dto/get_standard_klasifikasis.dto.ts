import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetStandardKlasifikasisDto {
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page: number = 1;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    amount: number = 10;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    id_asb_klasifikasi?: number;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    id_kabkota?: number;
}
