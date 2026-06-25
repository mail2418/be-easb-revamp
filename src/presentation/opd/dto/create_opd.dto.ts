import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOpdDto {
    @IsString()
    @IsNotEmpty()
    opd!: string;

    @IsString()
    @IsNotEmpty()
    alias!: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    id_user!: number;
}
