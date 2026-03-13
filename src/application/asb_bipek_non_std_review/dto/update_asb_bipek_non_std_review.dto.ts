import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CalculationMethod } from '../../../domain/asb_bipek_non_std_review/calculation_method.enum';

export class UpdateAsbBipekNonStdReviewDto {
    @IsInt()
    id: number;

    @IsInt()
    idAsb: number;

    @IsInt()
    @IsOptional()
    idAsbBipekNonStd?: number;

    @IsInt()
    @IsOptional()
    idAsbKomponenBangunanNonstd?: number | null;

    @IsEnum(Files)
    @IsOptional()
    files?: Files;

    @IsNumber()
    @IsOptional()
    bobotInput?: number | null;

    @IsEnum(CalculationMethod)
    @IsOptional()
    calculationMethod?: CalculationMethod;

    @IsNumber()
    @IsOptional()
    bobotInputProsentase?: number | null;

    @IsNumber()
    @IsOptional()
    jumlahBobot?: number | null;

    @IsNumber()
    @IsOptional()
    rincianHarga?: number | null;
}
