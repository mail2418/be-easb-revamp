import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJalanJenisPerkerasanDto {
    @IsNotEmpty()
    @IsString()
    jenis_perkerasan!: string;
}
