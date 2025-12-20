import { IsNumber, IsNotEmpty, IsPositive } from "class-validator";
import { Transform } from "class-transformer";

export class CreateBulkAsbJakonDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  tahun!: number;
  
  // Note: File is handled separately via @UploadedFile() decorator in controller
}

