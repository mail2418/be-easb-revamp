import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsEnum, Matches, MinLength } from 'class-validator';
import { Role } from 'src/domain/user/user_role.enum';
import { STRONG_PASSWORD_MESSAGE, STRONG_PASSWORD_REGEX } from 'src/common/validators/strong-password';

export class CreateUserDto {
    @IsString()
    @Transform(({ value }) => value?.trim())
    username!: string;

    @IsString()
    @MinLength(8)
    @Matches(STRONG_PASSWORD_REGEX, { message: STRONG_PASSWORD_MESSAGE })
    password!: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(Role, { each: true })
    roles!: Role[];
}
