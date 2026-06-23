import { IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAsbBpsGalleryNonstdDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) =>
        value !== undefined && value !== null ? parseInt(value, 10) : undefined,
    )
    idAsbKomponenBangunanNonstd?: number;

    // File is handled via @UploadedFile() decorator in controller

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) =>
        value !== undefined && value !== null ? parseFloat(value) : undefined,
    )
    jumlahBobot?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) =>
        value !== undefined && value !== null ? parseFloat(value) : undefined,
    )
    rincianHarga?: number;
}
