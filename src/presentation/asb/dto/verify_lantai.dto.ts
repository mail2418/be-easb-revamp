import { IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyLantaiDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_asb!: number;

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseFloat(v)) : value)
    verif_luas_lantai!: number[];

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseInt(v, 10)) : value)
    verif_id_asb_lantai!: number[];

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseInt(v, 10)) : value)
    verif_id_asb_fungsi_ruang!: number[];
}
