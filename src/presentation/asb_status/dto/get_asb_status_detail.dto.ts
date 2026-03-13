import { IsNumber, Min } from 'class-validator';

export class GetAsbStatusDetailDto {
  @IsNumber()
  @Min(1)
  id!: number;
}
