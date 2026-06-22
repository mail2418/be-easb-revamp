import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetSaluranSpesifikasiSmkkByUsulanSaluranDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanSaluran!: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    amount?: number;
}
