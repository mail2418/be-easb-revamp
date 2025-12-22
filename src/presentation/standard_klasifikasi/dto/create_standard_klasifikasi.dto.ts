import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateStandardKlasifikasiDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 500)
    uraian_standard: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 500)
    uraian_spek: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value))
    inflasi: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb_klasifikasi: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_kabkota: number;
}
