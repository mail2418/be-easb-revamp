import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { AsbKomponenBangunanStdFiles } from '../../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std_files.enum';

export class CreateAsbKomponenBangunanStdDto {
    @IsString()
    @IsNotEmpty()
    komponen!: string;

    @IsEnum(AsbKomponenBangunanStdFiles)
    @IsNotEmpty()
    files!: AsbKomponenBangunanStdFiles;

    @IsNumber()
    @IsNotEmpty()
    idAsbJenis!: number;

    @IsNumber()
    @IsNotEmpty()
    idAsbTipeBangunan!: number;
}
