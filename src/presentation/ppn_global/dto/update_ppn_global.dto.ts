import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class UpdatePpnGlobalDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    bulan?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    tahun?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    persentase_ppn?: number;
}
