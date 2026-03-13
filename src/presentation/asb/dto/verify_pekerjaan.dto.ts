import { IsNumber, IsNotEmpty } from 'class-validator';

export class VerifyPekerjaanDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;

    @IsNumber()
    @IsNotEmpty()
    perencanaan_konstruksi: number;

    @IsNumber()
    @IsNotEmpty()
    pengawasan_konstruksi: number;

    @IsNumber()
    @IsNotEmpty()
    management_konstruksi: number;

    @IsNumber()
    @IsNotEmpty()
    pengelolaan_kegiatan: number;
}
