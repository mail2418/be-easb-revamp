import { IsOptional, IsNumber } from 'class-validator';

export class CreateAsbBpsGalleryNonstdDto {
    @IsOptional()
    @IsNumber()
    idAsbKomponenBangunanNonstd?: number;

    // File is handled via @UploadedFile() decorator in controller

    @IsOptional()
    @IsNumber()
    jumlahBobot?: number;

    @IsOptional()
    @IsNumber()
    rincianHarga?: number;
}
