import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteProvinceDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
