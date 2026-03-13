import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetSatuanDetailDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
