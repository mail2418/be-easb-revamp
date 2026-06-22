import { IsNumber, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class ChangePasswordDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    userId!: number;

    @IsString()
    @MinLength(1)
    currentPassword!: string;

    @IsString()
    @MinLength(8)
    newPassword!: string;
}
