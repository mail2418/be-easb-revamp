import { IsNumber, IsNotEmpty } from 'class-validator';

export class VerifyRekeningDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb: number;

    @IsNumber()
    @IsNotEmpty()
    id_rekening_review: number;
}
