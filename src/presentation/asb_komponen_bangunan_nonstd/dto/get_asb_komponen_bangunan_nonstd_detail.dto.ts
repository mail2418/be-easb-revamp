import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAsbKomponenBangunanNonstdDetailDto {
    @IsNumber()
    @Type(() => Number)
    id!: number;
}
