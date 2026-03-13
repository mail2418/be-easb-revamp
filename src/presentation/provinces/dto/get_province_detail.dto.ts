import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetProvinceDetailDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
