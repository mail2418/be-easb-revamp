import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, IsArray, ArrayNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { Role } from 'src/domain/user/user_role.enum';

// Admin hanya bisa update user dengan role VERIFIKATOR, OPD, GUEST
const ALLOWED_ROLES_FOR_ADMIN = [Role.VERIFIKATOR, Role.OPD, Role.GUEST];

export class UpdateUserByAdminDto {
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
  @IsEnum(ALLOWED_ROLES_FOR_ADMIN as any, { each: true })
  @IsOptional()
  roles?: Role[];
}
