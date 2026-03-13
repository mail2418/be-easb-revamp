import { IsNumber } from 'class-validator';

export class GetAsbJakonDetailDto {
    @IsNumber()
    id!: number;
}
