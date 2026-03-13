import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteAsbKlasifikasiDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
