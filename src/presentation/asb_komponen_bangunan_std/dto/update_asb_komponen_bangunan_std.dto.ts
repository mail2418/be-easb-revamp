import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { AsbKomponenBangunanStdFiles } from '../../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std_files.enum';

export class UpdateAsbKomponenBangunanStdDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    komponen?: string;

    @IsEnum(AsbKomponenBangunanStdFiles)
    @IsOptional()
    files?: AsbKomponenBangunanStdFiles;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbJenis?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbTipeBangunan?: number;
}
