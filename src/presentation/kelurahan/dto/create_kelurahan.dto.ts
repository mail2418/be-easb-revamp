import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateKelurahanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idKecamatan: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    namaKelurahan: string;
}
