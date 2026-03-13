import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteAsbDto {
    @IsInt()
    @IsNotEmpty()
    id_asb: number;
}
