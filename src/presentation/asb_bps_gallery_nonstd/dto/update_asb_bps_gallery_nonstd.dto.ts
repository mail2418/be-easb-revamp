import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbBpsGalleryNonstdDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idAsb!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value !== undefined && value !== null ? parseInt(value, 10) : undefined)
    idAsbKomponenBangunanNonstd?: number;

    // File is optional for update, handled via @UploadedFile() decorator

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    jumlahBobot?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value !== undefined && value !== null ? parseFloat(value) : undefined)
    rincianHarga?: number;
}
