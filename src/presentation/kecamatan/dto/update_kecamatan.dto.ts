import { IsInt, IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateKecamatanDto {

    @IsInt()
    @IsNotEmpty()
    id: number;


    @IsInt()
    @IsOptional()
    idKabkota?: number;


    @IsString()
    @IsOptional()
    @MaxLength(50)
    kodeKecamatan?: string;


    @IsString()
    @IsOptional()
    @MaxLength(255)
    namaKecamatan?: string;
}
