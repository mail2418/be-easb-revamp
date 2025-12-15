import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyRuangLingkupUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    idUsulanJalan: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    verifIdSpesifikasiDesainLentur?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    verifIdSpesifikasiDesainKaku?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    verifIdRuangLingkupPerkerasanLentur?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    verifIdRuangLingkupPerkerasanKaku?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    verifIdMutuBeton?: number;

    @IsOptional()
    @IsString()
    verifKeteranganTambahan?: string;
}


