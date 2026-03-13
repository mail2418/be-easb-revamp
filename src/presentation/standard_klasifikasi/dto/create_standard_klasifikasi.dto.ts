import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';

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
    inflasi: number;

    @IsNumber()
    @IsNotEmpty()
    id_asb_klasifikasi: number;

    @IsNumber()
    @IsNotEmpty()
    id_kabkota: number;
}
