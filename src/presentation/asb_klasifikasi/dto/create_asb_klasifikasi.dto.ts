import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAsbKlasifikasiDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb_tipe_bangunan!: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    klasifikasi!: string;
}
