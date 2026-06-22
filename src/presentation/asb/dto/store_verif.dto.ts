import { IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class StoreVerifDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb!: number;
}
