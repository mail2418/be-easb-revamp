import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AsbStatusSummaryDto {
    @IsString()
    @IsNotEmpty()
    asbStatus: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
