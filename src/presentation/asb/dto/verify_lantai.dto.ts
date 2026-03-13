import { IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class VerifyLantaiDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;

    @IsArray()
    @IsNumber({}, { each: true })
    verif_luas_lantai: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    verif_id_asb_lantai: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    verif_id_asb_fungsi_ruang: number[];
}
