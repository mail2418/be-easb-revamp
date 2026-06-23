import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateKecamatanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idKabkota: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    kodeKecamatan: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    namaKecamatan: string;
}
