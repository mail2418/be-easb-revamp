import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateHspkDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsNumber()
    @IsNotEmpty()
    id_ruang_lingkup!: number;

    @IsString()
    @IsNotEmpty()
    no_mata_pembayaran!: string;

    @IsString()
    @IsNotEmpty()
    satuan!: string;

    @IsNumber()
    @IsNotEmpty()
    harga_satuan!: number;

    @IsString()
    @IsNotEmpty()
    uraian!: string;
}
