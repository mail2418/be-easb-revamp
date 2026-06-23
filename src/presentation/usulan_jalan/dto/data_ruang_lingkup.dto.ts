import { IsArray, IsNotEmpty, IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DataHspkDto } from './data_hspk.dto';

export class DataRuangLingkupDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => DataHspkDto)
    data_hspk!: DataHspkDto[];
}
