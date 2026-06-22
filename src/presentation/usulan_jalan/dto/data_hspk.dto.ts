import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class DataHspkDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    id_hspk!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    spasi!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    tinggi!: number;
}

