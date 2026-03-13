import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class StoreBpnsDto {
    @IsNumber()
    id_asb: number;

    @IsOptional()
    @IsNumber()
    id_asb_bipek_nonstd?: number;

    @IsArray()
    @IsNumber({}, { each: true })
    komponen_nonstd: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    bobot_nonstd: number[];
}
