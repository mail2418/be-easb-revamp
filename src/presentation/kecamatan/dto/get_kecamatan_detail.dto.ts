import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetKecamatanDetailDto {

    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    id: number;
}
