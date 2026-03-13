import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CalculationMethod } from '../../../domain/asb_bipek_non_std_review/calculation_method.enum';

export class CreateAsbBipekNonStdReviewDto {
    @IsInt()
    idAsbBipekNonStd: number;

    @IsInt()
    idAsbKomponenBangunanNonstd: number;

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
    bobotInputProsentase: number;

    @IsNumber()
    jumlahBobot: number;

    @IsNumber()
    rincianHarga: number;
}
