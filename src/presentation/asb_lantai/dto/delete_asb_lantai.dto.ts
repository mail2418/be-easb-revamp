import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteAsbLantaiDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
