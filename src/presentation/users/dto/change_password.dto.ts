import { IsNumber, IsString, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { STRONG_PASSWORD_MESSAGE, STRONG_PASSWORD_REGEX } from 'src/common/validators/strong-password';

export class ChangePasswordDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    userId!: number;

    @IsString()
    @MinLength(1)
    currentPassword!: string;

    @IsString()
    @MinLength(8)
    @Matches(STRONG_PASSWORD_REGEX, { message: STRONG_PASSWORD_MESSAGE })
    newPassword!: string;
}
