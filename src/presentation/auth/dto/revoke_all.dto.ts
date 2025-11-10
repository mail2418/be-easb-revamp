import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class RevokeAllDto {
  @IsInt()
  @Type(() => Number)
  userId!: number;
}