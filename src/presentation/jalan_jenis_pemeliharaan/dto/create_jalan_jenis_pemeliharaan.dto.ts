import { IsNotEmpty, IsString } from 'class-validator';
export class CreateJalanJenisPemeliharaanDto {
    @IsString()
    @IsNotEmpty()
    tingkat_pemeliharaan!: string;

    @IsString()
    @IsNotEmpty()
    jenis_pemeliharaan!: string;

    @IsString()
    @IsNotEmpty()
    ruang_lingkup!: string;

    @IsString()
    @IsNotEmpty()
    deskripsi!: string;
}
