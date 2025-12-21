import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateHspkDto {
    @IsNotEmpty()
    @IsNumber()
    id_ruang_lingkup!: number;

    @IsNotEmpty()
    @IsString()
    no_mata_pembayaran!: string;

    @IsNotEmpty()
    @IsString()
    satuan!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    harga_satuan!: number;
}

