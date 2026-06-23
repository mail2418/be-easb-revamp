import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJalanJenisPemeliharaanDto {
    @IsNotEmpty()
    @IsString()
    tingkat_pemeliharaan!: string;

    @IsNotEmpty()
    @IsString()
    jenis_pemeliharaan!: string;

    @IsNotEmpty()
    @IsString()
    ruang_lingkup!: string;

    @IsNotEmpty()
    @IsString()
    deskripsi!: string;
}
