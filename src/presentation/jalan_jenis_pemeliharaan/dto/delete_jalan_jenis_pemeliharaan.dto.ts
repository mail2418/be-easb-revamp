import { IsNotEmpty, IsNumber } from 'class-validator';
export class DeleteJalanJenisPemeliharaanDto { @IsNumber() @IsNotEmpty() id!: number; }
