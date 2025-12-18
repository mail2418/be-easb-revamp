import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbBpsGalleryStdDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsb!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value !== undefined && value !== null ? parseInt(value, 10) : undefined)
    idAsbKomponenBangunanStd?: number;

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
