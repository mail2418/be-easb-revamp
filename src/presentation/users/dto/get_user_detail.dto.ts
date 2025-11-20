import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetUserDetailDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
