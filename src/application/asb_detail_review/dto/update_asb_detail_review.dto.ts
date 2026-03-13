import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class UpdateAsbDetailReviewDto {
    @IsInt()
    id: number;

    @IsInt()
    idAsb: number;

    @IsInt()
    @IsOptional()
    idAsbDetail: number;

    @IsEnum(Files)
    @IsOptional()
    files: Files;

    @IsInt()
    @IsOptional()
    idAsbLantai: number;

    @IsInt()
    @IsOptional()
    idAsbFungsiRuang: number;

    @IsNumber()
    @IsOptional()
    asbFungsiRuangKoef: number;

    @IsNumber()
    @IsOptional()
    lantaiKoef: number;

    @IsNumber()
    @IsOptional()
    luas: number;
}
