import { IsInt } from 'class-validator';

export class GetAsbBipekNonStdDto {
    @IsInt()
    id: number;
}
