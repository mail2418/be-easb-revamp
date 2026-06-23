import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetRekeningsDto {
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
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    id_jenis_usulan?: number;

    @IsOptional()
    @IsString()
    search?: string;
}
