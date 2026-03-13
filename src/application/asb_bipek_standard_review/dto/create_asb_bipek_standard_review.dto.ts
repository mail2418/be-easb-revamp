import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';

export class CreateAsbBipekStandardReviewDto {
    @IsInt()
    @IsOptional()
    idAsbBipekStandard: number;

    @IsInt()
    idAsbKomponenBangunanStd: number;

    @IsInt()
    idAsb: number;

    @IsEnum(Files)
    @IsOptional()
    files: Files;

    @IsNumber()
    bobotInput: number;

    @IsEnum(CalculationMethod)
    calculationMethod: CalculationMethod;

    @IsNumber()
    jumlahBobot: number;

    @IsNumber()
    rincianHarga: number;
}
