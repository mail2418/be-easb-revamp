import { IsInt } from 'class-validator';

export class DeleteAsbDetailDto {
    @IsInt()
    id: number;
}
