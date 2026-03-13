import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class StoreBpsDto {
    @IsNumber()
    id_asb: number;

    @IsOptional()
    @IsNumber()
    id_asb_bipek_standard?: number;

    @IsArray()
    @IsNumber({}, { each: true })
    komponen_std: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    bobot_std: number[];
}
