import { IsInt } from 'class-validator';

export class DeleteAsbBipekNonStdReviewDto {
    @IsInt()
    id: number;
}
