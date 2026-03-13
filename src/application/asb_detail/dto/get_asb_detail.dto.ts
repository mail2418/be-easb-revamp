import { IsInt } from 'class-validator';

export class GetAsbDetailDto {
    @IsInt()
    id: number;
}
