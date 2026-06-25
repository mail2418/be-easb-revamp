import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetRencanaTahunAnggaranDetailDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;
}
