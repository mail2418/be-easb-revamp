import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAsbBipekNonStdReviewByAsbDto {
    @IsInt()
    @Type(() => Number)
    idAsb: number;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    amount: number;
}
