import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteRekeningDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
