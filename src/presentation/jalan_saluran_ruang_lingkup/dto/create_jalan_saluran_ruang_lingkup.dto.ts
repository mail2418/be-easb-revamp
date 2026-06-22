import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateJalanSaluranRuangLingkupDto {
    @IsNumber() @IsNotEmpty() id_jenis_usulan!: number;
    @IsString() @IsNotEmpty() deskripsi_ruang_lingkup!: string;
}