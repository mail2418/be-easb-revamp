import { IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsNumber()
  userId!: number;

  @IsString()
  @MinLength(8)
  newPassword!: string;

  @IsString()
  @IsNotEmpty()
  currentPassword!: string;
}
