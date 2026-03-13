import { IsNumber } from 'class-validator';

export class DeleteAsbKomponenBangunanNonstdDto {
    @IsNumber()
    id!: number;
}
