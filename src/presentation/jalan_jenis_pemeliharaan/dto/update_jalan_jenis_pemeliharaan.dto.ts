import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateJalanJenisPemeliharaanDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsOptional()
    @IsString()
    tingkat_pemeliharaan?: string;

    @IsOptional()
    @IsString()
    jenis_pemeliharaan?: string;

    @IsOptional()
    @IsString()
    ruang_lingkup?: string;

    @IsOptional()
    @IsString()
    deskripsi?: string;
}
