import { IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteAsbLantaiDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  id!: number;
}
