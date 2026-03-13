import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';

export class UpdateAsbBipekStandardDto {
    @IsInt()
    id: number;

    @IsInt()
    idAsb: number;

    @IsEnum(Files)
    @IsOptional()
    files?: Files;

    @IsInt()
    @IsOptional()
    idAsbKomponenBangunanStd?: number | null;

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
