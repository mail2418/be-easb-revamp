import { IsNumber, IsNotEmpty } from "class-validator";

export class UpdateNominalShstDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;
    
    @IsNumber()
    @IsNotEmpty()
    nominal!: number;
}
