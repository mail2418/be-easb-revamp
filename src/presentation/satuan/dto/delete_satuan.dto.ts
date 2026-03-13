import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteSatuanDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
