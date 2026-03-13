import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAsbBpsGalleryNonstdDto {
    @IsNumber()
    id: number;

    @IsNumber()
    idAsb: number;

    @IsOptional()
    @IsNumber()
    idAsbKomponenBangunanNonstd?: number;

    // File is optional for update, handled via @UploadedFile() decorator

    @IsOptional()
    @IsNumber()
    jumlahBobot?: number;

    @IsOptional()
    @IsNumber()
    rincianHarga?: number;
}
