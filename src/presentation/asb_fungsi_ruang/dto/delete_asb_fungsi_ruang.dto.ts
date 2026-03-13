import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteAsbFungsiRuangDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
