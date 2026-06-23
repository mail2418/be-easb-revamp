import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAsbKomponenBangunanProsStdDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idAsbKomponenBangunanStd!: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) =>
        value !== undefined && value !== null ? parseFloat(value) : undefined,
    )
    min?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) =>
        value !== undefined && value !== null ? parseFloat(value) : undefined,
    )
    avgMin?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) =>
        value !== undefined && value !== null ? parseFloat(value) : undefined,
    )
    avg?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) =>
        value !== undefined && value !== null ? parseFloat(value) : undefined,
    )
    avgMax?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) =>
        value !== undefined && value !== null ? parseFloat(value) : undefined,
    )
    max?: number;
}
