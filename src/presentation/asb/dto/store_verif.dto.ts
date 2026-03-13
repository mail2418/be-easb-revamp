import { IsNumber, IsNotEmpty } from 'class-validator';

export class StoreVerifDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;
}
