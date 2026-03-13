import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';

export class UpdateAsbBipekStandardReviewDto {
    @IsInt()
    id: number;

    @IsInt()
    idAsb: number;

    @IsInt()
    @IsOptional()
    idAsbBipekStandard?: number | null;

    @IsInt()
    @IsOptional()
    idAsbKomponenBangunanStd?: number | null;

    @IsEnum(Files)
    @IsOptional()
    files?: Files;

    @IsNumber()
    @IsOptional()
    bobotInput?: number | null;

    @IsEnum(CalculationMethod)
    @IsOptional()
    calculationMethod?: CalculationMethod | null;

    @IsNumber()
    @IsOptional()
    jumlahBobot?: number | null;

    @IsNumber()
    @IsOptional()
    rincianHarga?: number | null;
}
