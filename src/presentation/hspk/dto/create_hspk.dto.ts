import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateHspkDto {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
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
    @Transform(({ value }) => parseFloat(value))
    harga_satuan!: number;
}

