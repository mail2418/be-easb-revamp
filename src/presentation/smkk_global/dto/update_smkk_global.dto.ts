import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateSmkkGlobalDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    bulan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    tahun?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    persentase_smkk?: number;
}

