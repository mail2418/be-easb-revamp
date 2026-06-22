import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateJalanSaluranRuangLingkupDto {
    @IsNumber() @IsNotEmpty() id!: number;
    @IsNumber() @IsNotEmpty() id_jenis_usulan!: number;
    @IsString() @IsNotEmpty() deskripsi_ruang_lingkup!: string;
}