import { IsInt } from 'class-validator';

export class DeleteAsbBipekNonStdDto {
    @IsInt()
    id: number;
}
