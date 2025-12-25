import { IsArray, IsNotEmpty, IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DataHspkReviewDto } from './data_hspk_review.dto';

export class DataRuangLingkupReviewDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => DataHspkReviewDto)
    data_hspk!: DataHspkReviewDto[];
}

