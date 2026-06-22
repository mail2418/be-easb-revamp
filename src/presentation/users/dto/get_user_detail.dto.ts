import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetUserDetailDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  id!: number;
}
