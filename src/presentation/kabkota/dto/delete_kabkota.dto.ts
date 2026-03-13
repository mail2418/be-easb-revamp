import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteKabKotaDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
