import { IsInt, IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateKelurahanDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsInt()
    @IsOptional()
    idKecamatan?: number;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    namaKelurahan?: string;
}
