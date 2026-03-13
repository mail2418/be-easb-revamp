import { IsInt } from 'class-validator';

export class GetAsbBipekStandardDto {
    @IsInt()
    id: number;
}
