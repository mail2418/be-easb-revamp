import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteUserByAdminDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}
