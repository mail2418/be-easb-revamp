import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRekeningDto {
    @IsString()
    @IsNotEmpty()
    rekening_kode!: string;

    @IsString()
    @IsNotEmpty()
    rekening_uraian!: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    bulan!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    tahun!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseInt(value, 10) : null))
    id_jenis_usulan?: number | null;
}
