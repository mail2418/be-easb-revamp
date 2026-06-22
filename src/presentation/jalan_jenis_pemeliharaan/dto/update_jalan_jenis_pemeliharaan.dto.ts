import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateJalanJenisPemeliharaanDto {
    @IsNumber() @IsNotEmpty() id!: number;
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
