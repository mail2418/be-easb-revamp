import { IsInt } from 'class-validator';

export class GetAsbBipekStandardReviewDto {
    @IsInt()
    id: number;
}
