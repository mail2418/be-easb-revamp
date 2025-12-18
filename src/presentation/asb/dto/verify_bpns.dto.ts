import { IsNumber, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyBpnsDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_asb!: number;

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseFloat(v)) : value)
    verif_komponen_nonstd!: number[];

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseFloat(v)) : value)
    verif_bobot_acuan_nonstd!: number[];

    // internal use
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @Transform(({ value }) => value && Array.isArray(value) ? value.map(v => parseFloat(v)) : value)
    id_asb_bipek_nonstd?: number[];
}
