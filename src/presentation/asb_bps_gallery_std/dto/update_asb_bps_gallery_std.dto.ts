import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAsbBpsGalleryStdDto {
    @IsNumber()
    id: number;

    @IsNumber()
    idAsb: number;

    @IsOptional()
    @IsNumber()
    idAsbKomponenBangunanStd?: number;

    // File is optional for update, handled via @UploadedFile() decorator

    @IsOptional()
    @IsNumber()
    jumlahBobot?: number;

    @IsOptional()
    @IsNumber()
    rincianHarga?: number;
}
