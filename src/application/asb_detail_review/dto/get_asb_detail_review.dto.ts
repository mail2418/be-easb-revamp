import { IsInt } from 'class-validator';

export class GetAsbDetailReviewDto {
    @IsInt()
    id: number;
}
