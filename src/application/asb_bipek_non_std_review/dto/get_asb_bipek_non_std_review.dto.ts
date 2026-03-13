import { IsInt } from 'class-validator';

export class GetAsbBipekNonStdReviewDto {
    @IsInt()
    id: number;
}
