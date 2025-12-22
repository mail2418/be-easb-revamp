import { IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyBpsDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb!: number;

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseFloat(v)) : value)
    verif_komponen_std!: number[];

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseFloat(v)) : value)
    verif_bobot_acuan_std!: number[];
}
