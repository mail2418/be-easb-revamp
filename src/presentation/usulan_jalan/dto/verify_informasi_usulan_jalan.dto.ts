import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateNested, ArrayMinSize } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DataRuangLingkupReviewDto } from './data_ruang_lingkup_review.dto';

export class VerifyInformasiUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan!: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    lebar?: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => DataRuangLingkupReviewDto)
    data_ruang_lingkup!: DataRuangLingkupReviewDto[];
}


