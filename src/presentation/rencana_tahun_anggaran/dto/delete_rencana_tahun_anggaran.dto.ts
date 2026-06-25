import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteRencanaTahunAnggaranDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;
}
