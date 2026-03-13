import { IsInt } from 'class-validator';

export class DeleteAsbBipekStandardDto {
    @IsInt()
    id: number;
}
