import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class CreateAsbDetailReviewDto {
    @IsInt()
    idAsb: number;

    @IsInt()
    idAsbDetail: number;

    @IsEnum(Files)
    @IsOptional()
    files: Files;

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
