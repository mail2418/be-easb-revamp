import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { AsbKomponenBangunanNonStdFiles } from 'src/domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd_files.enum';

export class UpdateAsbKomponenBangunanNonstdDto {
    @IsNumber()
    id!: number;

    @IsString()
    @IsOptional()
    komponen?: string;

    @IsEnum(AsbKomponenBangunanNonStdFiles)
    @IsOptional()
    files?: AsbKomponenBangunanNonStdFiles;

    @IsNumber()
    @IsOptional()
    idAsbJenis?: number;

    @IsNumber()
    @IsOptional()
    idAsbTipeBangunan?: number;
}
