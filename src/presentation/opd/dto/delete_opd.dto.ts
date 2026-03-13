import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteOpdDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
