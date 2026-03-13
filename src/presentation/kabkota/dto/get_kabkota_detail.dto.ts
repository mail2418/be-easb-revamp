import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetKabKotaDetailDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;
}