import { IsInt, IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateKecamatanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id: number;

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
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
