import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetStandardKlasifikasiDetailDto {
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
