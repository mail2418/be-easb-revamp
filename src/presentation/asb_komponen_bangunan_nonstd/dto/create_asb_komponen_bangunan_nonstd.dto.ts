import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { AsbKomponenBangunanNonStdFiles } from 'src/domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd_files.enum';

export class CreateAsbKomponenBangunanNonstdDto {
    @IsString()
    @IsNotEmpty()
    komponen!: string;

    @IsEnum(AsbKomponenBangunanNonStdFiles)
    @IsNotEmpty()
    files!: AsbKomponenBangunanNonStdFiles;

    @IsNumber()
    @IsNotEmpty()
    idAsbJenis!: number;

    @IsNumber()
    @IsNotEmpty()
    idAsbTipeBangunan!: number;
}
