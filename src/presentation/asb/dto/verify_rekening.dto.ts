import { IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyRekeningDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_asb!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id_rekening_review!: number;
}
