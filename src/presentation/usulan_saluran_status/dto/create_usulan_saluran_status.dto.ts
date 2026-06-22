import { IsString, IsNotEmpty } from "class-validator";

export class CreateUsulanSaluranStatusDto {
    @IsString()
    @IsNotEmpty()
    status!: string;
}
