import { Transform } from 'class-transformer';
import { IsNumber, Min, IsNotEmpty } from 'class-validator';

export class GetAsbLantaiDetailDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;
}
