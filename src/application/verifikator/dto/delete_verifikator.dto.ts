import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteVerifikatorDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;
}
