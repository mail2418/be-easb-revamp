import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GetAsbLantaiDetailDto {
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    id!: number;
}
