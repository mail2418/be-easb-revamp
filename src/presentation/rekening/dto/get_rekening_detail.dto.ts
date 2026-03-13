import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetRekeningDetailDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
