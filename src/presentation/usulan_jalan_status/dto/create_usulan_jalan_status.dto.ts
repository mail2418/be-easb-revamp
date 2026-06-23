import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUsulanJalanStatusDto {
    @IsString()
    @IsNotEmpty()
    status!: string;
}
