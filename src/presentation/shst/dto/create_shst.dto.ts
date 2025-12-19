import { IsNumber, IsNotEmpty, IsPositive } from "class-validator";

export class CreateShstDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  tahun!: number;
  
  // Note: File is handled separately via @UploadedFile() decorator in controller
}
