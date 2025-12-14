import { IsNumber, IsString, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateUsulanJalanStatusDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsOptional()
    status?: string;
}

