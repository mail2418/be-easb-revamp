import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateJalanJenisPerkerasanDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsNotEmpty()
    jenis_perkerasan!: string;
}
