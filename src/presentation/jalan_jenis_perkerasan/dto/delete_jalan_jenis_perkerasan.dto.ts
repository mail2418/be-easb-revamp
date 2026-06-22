import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteJalanJenisPerkerasanDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;
}
