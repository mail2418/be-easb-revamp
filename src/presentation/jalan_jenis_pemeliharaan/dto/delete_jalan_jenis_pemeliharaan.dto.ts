import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteJalanJenisPemeliharaanDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}
