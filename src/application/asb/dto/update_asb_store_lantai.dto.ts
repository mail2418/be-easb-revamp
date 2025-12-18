import { IsInt, IsNotEmpty, IsNumber, IsArray, ArrayMinSize, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAsbStoreLantaiDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_asb!: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseFloat(v)) : value)
    luas_lantai!: number[];

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseInt(v, 10)) : value)
    id_asb_lantai!: number[];

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @Transform(({ value }) => Array.isArray(value) ? value.map(v => parseInt(v, 10)) : value)
    id_asb_fungsi_ruang!: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @Transform(({ value }) => value && Array.isArray(value) ? value.map(v => parseInt(v, 10)) : value)
    id_asb_bipek_standard?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @Transform(({ value }) => value && Array.isArray(value) ? value.map(v => parseInt(v, 10)) : value)
    id_asb_bipek_nonstd?: number[];

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    id_asb_klasifikasi?: number;
}
