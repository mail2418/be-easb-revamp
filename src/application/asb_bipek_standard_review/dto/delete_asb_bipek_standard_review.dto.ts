import { IsInt } from 'class-validator';

export class DeleteAsbBipekStandardReviewDto {
    @IsInt()
    id: number;
}
