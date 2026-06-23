import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetStandardKlasifikasisDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    page?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    amount?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    id_asb_klasifikasi?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    id_kabkota?: number;
}
