import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbBpsGalleryStdListFilterDto {
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    @IsNumber()
    idAsbKomponenBangunanStd?: number;

    @IsOptional()
    @IsString()
    filename?: string;

    @IsOptional()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    @IsNumber()
    jumlahBobot?: number;

    @IsOptional()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    @IsNumber()
    rincianHarga?: number;
}
