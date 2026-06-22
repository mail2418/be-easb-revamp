import { IsInt, IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateKelurahanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id: number;

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idKecamatan?: number;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    namaKelurahan?: string;
}
