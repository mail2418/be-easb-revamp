import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RevokeAllDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  userId!: number;
}