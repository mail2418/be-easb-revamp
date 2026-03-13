import { IsInt } from 'class-validator';

export class DeleteAsbDetailReviewDto {
    @IsInt()
    id: number;
}
