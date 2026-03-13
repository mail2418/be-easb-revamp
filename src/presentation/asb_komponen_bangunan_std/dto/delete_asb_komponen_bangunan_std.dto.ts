import { IsNumber } from 'class-validator';

export class DeleteAsbKomponenBangunanStdDto {
    @IsNumber()
    id!: number;
}
