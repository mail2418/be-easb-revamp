import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { AsbKomponenBangunanNonStdFiles } from 'src/domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd_files.enum';

export class CreateAsbKomponenBangunanNonstdDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    komponen!: string;

    @IsEnum(AsbKomponenBangunanNonStdFiles)
    @IsNotEmpty()
    files!: AsbKomponenBangunanNonStdFiles;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbJenis!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
    idAsbTipeBangunan!: number;
}
