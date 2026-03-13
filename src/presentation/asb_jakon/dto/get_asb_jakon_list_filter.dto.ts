import { IsNumber, IsOptional } from "class-validator";
import { AsbJakonType } from "src/domain/asb_jakon/asb_jakon_type.enum";

export class GetAsbJakonListFilterDto {
    @IsNumber()
    @IsOptional()
    idAsbJenis?: number;

    @IsNumber()
    @IsOptional()
    idAsbTipeBangunan?: number;

    @IsNumber()
    @IsOptional()
    idAsbKlasifikasi?: number;

    @IsNumber()
    @IsOptional()
    tahun?: number;

    @IsNumber()
    @IsOptional()
    type?: AsbJakonType;
}