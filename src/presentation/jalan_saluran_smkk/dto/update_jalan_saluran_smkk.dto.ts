import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateJalanSaluranSmkkDto {
    @IsNumber() @IsNotEmpty() id!: number;
    @IsNumber() @IsNotEmpty() id_jenis_usulan!: number;
    @IsString() @IsNotEmpty() no_mata_pembayaran!: string;
    @IsString() @IsNotEmpty() satuan!: string;
    @IsString() @IsNotEmpty() uraian!: string;
    @IsNumber() @IsNotEmpty() pengali!: number;
}