import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FindAllUsulanJalanDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Transform(({ value }) => (value === null || value === '' ? undefined : value))
    page?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Transform(({ value }) => (value === null || value === '' ? undefined : value))
    amount?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idUsulanJalanStatus?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    tahunAnggaran?: number;

    @IsOptional()
    @IsString()
    namaUsulanJalan?: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idKabkota?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idKecamatan?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idKelurahan?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idJalanJenisPerkerasan?: number;
}


