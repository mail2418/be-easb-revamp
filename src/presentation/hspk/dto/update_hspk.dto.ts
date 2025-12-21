import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateHspkDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsNumber()
    id_ruang_lingkup?: number;

    @IsOptional()
    @IsString()
    no_mata_pembayaran?: string;

    @IsOptional()
    @IsString()
    satuan?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    harga_satuan?: number;
}

