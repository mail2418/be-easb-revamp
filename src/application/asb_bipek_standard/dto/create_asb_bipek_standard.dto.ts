import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';

export class CreateAsbBipekStandardDto {
    @IsEnum(Files)
    @IsOptional()
    files: Files;

    @IsInt()
    idAsbKomponenBangunanStd: number;

    @IsInt()
    idAsb: number;

    @IsNumber()
    bobotInput: number;

    @IsEnum(CalculationMethod)
    calculationMethod: CalculationMethod;

    @IsNumber()
    jumlahBobot: number;

    @IsNumber()
    rincianHarga: number;
}
