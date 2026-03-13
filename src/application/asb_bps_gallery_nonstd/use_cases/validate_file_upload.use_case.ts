import { BadRequestException, Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class ValidateFileUploadUseCase {
    private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private readonly ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
    ];

    execute(file: Express.Multer.File): void {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        // Validate file size
        if (file.size > this.MAX_FILE_SIZE) {
            throw new BadRequestException(
                `File size exceeds maximum allowed size of 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
            );
        }

        // Validate file type
        if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new BadRequestException(
                `Invalid file type. Only images (jpg, jpeg, png, gif, webp) are allowed. You uploaded: ${file.mimetype}`,
            );
        }
    }
}
