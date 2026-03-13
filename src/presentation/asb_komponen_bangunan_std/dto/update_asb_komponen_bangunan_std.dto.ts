import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { AsbKomponenBangunanStdFiles } from '../../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std_files.enum';

export class UpdateAsbKomponenBangunanStdDto {
    @IsNumber()
    id!: number;

    @IsString()
    @IsOptional()
    komponen?: string;

    @IsEnum(AsbKomponenBangunanStdFiles)
    @IsOptional()
    files?: AsbKomponenBangunanStdFiles;

    @IsNumber()
    @IsOptional()
    idAsbJenis?: number;

    @IsNumber()
    @IsOptional()
    idAsbTipeBangunan?: number;
}
