import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { AsbKomponenBangunanNonStdFiles } from 'src/domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd_files.enum';

export class UpdateAsbKomponenBangunanNonstdDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    komponen?: string;

    @IsEnum(AsbKomponenBangunanNonStdFiles)
    @IsOptional()
    files?: AsbKomponenBangunanNonStdFiles;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbJenis?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbTipeBangunan?: number;
}
