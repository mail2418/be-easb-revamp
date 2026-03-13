import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbBpsGalleryNonstdListFilterDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    idAsbKomponenBangunanNonstd?: number;

    @IsOptional()
    @IsString()
    filename?: string;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    jumlahBobot?: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    rincianHarga?: number;
}
