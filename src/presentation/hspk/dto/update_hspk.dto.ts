import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateHspkDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_ruang_lingkup?: number;

    @IsOptional()
    @IsNumber()
    @Min(2000)
    @Max(2100)
    @Transform(({ value }) => (value !== undefined && value !== null && value !== '' ? parseInt(value, 10) : undefined))
    tahun_anggaran?: number;

    @IsOptional()
    @IsString()
    no_mata_pembayaran?: string;

    @IsOptional()
    @IsString()
    satuan?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    harga_satuan?: number;
}

