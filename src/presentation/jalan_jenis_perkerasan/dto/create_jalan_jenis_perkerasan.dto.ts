import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJalanJenisPerkerasanDto {
    @IsString()
    @IsNotEmpty()
    jenis_perkerasan!: string;
}
