import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbTipeBangunanDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    tipe_bangunan!: string;
}
