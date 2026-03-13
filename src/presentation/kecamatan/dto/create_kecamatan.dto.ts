import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateKecamatanDto {

    @IsInt()
    @IsNotEmpty()
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
