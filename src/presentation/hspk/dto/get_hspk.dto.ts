import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetHspkDto {
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

    @IsOptional()
    @IsNumber()
    @Min(2000)
    @Max(2100)
    @Transform(({ value }) =>
        value !== undefined && value !== null && value !== '' ? parseInt(value, 10) : undefined,
    )
    tahun_anggaran?: number;

    @IsOptional()
    @IsString()
    search?: string;
}
