import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, IsArray, ArrayNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { Role } from 'src/domain/user/user_role.enum';

export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  @IsOptional()
  roles?: Role[];
}
