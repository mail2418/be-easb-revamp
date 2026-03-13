import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetAsbKlasifikasiDetailDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
