import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateKelurahanDto {
    @IsInt()
    @IsNotEmpty()
    idKecamatan: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    namaKelurahan: string;
}
