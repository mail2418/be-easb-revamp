import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetAsbFungsiRuangDetailDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
