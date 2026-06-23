import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBulkAsbJakonDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Transform(({ value }) => parseInt(value, 10))
    tahun!: number;

    // Note: File is handled separately via @UploadedFile() decorator in controller
}
