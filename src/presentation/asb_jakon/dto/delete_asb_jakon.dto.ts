import { IsNumber } from 'class-validator';

export class DeleteAsbJakonDto {
    @IsNumber()
    id!: number;
}
