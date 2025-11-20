import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUsersDto {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page!: number;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  amount!: number;
}
