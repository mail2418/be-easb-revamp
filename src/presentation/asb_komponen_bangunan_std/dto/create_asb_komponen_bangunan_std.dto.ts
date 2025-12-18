import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { AsbKomponenBangunanStdFiles } from '../../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std_files.enum';

export class CreateAsbKomponenBangunanStdDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    komponen!: string;

    @IsEnum(AsbKomponenBangunanStdFiles)
    @IsNotEmpty()
    files!: AsbKomponenBangunanStdFiles;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbJenis!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbTipeBangunan!: number;
}
