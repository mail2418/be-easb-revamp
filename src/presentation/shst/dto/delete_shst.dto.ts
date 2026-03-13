import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteShstDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
