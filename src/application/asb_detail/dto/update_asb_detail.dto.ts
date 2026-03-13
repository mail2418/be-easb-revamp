import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class UpdateAsbDetailDto {
    @IsInt()
    id: number;

    @IsInt()
    idAsb: number;

    @IsEnum(Files)
    @IsOptional()
    files?: Files;

    @IsInt()
    @IsOptional()
    idAsbLantai?: number | null;

    @IsInt()
    @IsOptional()
    idAsbFungsiRuang?: number | null;

    @IsNumber()
    @IsOptional()
    asbFungsiRuangKoef?: number | null;

    @IsNumber()
    @IsOptional()
    lantaiKoef?: number | null;

    @IsNumber()
    @IsOptional()
    luas?: number | null;
}
