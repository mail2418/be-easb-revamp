import { IsString, IsNotEmpty, MinLength, IsNumber, Matches } from 'class-validator';
import { STRONG_PASSWORD_MESSAGE, STRONG_PASSWORD_REGEX } from 'src/common/validators/strong-password';

export class ChangeUserPasswordDto {
    @IsNumber()
    userId!: number;

    @IsString()
    @MinLength(8)
    @Matches(STRONG_PASSWORD_REGEX, { message: STRONG_PASSWORD_MESSAGE })
    newPassword!: string;

    @IsString()
    @IsNotEmpty()
    currentPassword!: string;
}
