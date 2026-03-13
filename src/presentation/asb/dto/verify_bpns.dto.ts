import { IsNumber, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class VerifyBpnsDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;

    @IsArray()
    @IsNumber({}, { each: true })
    verif_komponen_nonstd: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    verif_bobot_acuan_nonstd: number[];

    // internal use
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    id_asb_bipek_nonstd?: number[];
}
