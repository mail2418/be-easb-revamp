import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class StoreRuangLingkupUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idUsulanJalan: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idSpesifikasiDesainLentur?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idSpesifikasiDesainLenturReview?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idSpesifikasiDesainKaku?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idSpesifikasiDesainKakuReview?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idRuangLingkupPerkerasanLentur?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idRuangLingkupPerkerasanLenturReview?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idRuangLingkupPerkerasanKaku?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idRuangLingkupPerkerasanKakuReview?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idMutuBeton?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idMutuBetonReview?: number;

    @IsOptional()
    @IsString()
    keteranganTambahan?: string;

    @IsOptional()
    @IsString()
    keteranganTambahanReview?: string;
}


