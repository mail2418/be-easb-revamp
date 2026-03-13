import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class CreateAsbBipekNonStdDto {
    @IsEnum(Files)
    @IsOptional()
    files: Files;

    @IsInt()
    idAsbKomponenBangunanNonStd: number;

    @IsInt()
    idAsb: number;

    @IsNumber()
    bobotInput: number;

    @IsNumber()
    @IsOptional()
    bobotInputProsentase: number;

    @IsOptional()
    calculationMethod: string;

    @IsNumber()
    jumlahBobot: number;

    @IsNumber()
    rincianHarga: number;
}
