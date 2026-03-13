import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class UpdateAsbBipekNonStdDto {
    @IsInt()
    id: number;

    @IsInt()
    idAsb: number;

    @IsEnum(Files)
    @IsOptional()
    files: Files;

    @IsInt()
    @IsOptional()
    idAsbKomponenBangunanNonStd: number;

    @IsNumber()
    @IsOptional()
    bobotInput: number;

    @IsNumber()
    @IsOptional()
    bobotInputProsentase: number;

    @IsOptional()
    calculationMethod: string;

    @IsNumber()
    @IsOptional()
    jumlahBobot: number;

    @IsNumber()
    @IsOptional()
    rincianHarga: number;
}
