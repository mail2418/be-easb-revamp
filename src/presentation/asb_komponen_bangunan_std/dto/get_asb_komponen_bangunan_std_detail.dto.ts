import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAsbKomponenBangunanStdDetailDto {
    @IsNumber()
    @Type(() => Number)
    id!: number;
}
