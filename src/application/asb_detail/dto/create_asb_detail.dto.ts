import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class CreateAsbDetailDto {
    @IsEnum(Files)
    @IsOptional()
    files?: Files;

    @IsInt()
    idAsb: number;

    @IsInt()
    idAsbLantai: number;

    @IsInt()
    idAsbFungsiRuang: number;

    @IsInt()
    idAsbTipeBangunan: number;

    @IsNumber()
    @IsOptional()
    asbFungsiRuangKoef: number;

    @IsNumber()
    @IsOptional()
    lantaiKoef: number;

    @IsNumber()
    luas: number;
}
