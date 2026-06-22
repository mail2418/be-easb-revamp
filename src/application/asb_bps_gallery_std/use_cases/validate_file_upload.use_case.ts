import { BadRequestException, Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as path from 'path';
import { fileTypeFromBuffer } from 'file-type';

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
    private readonly ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    async execute(file: Express.Multer.File): Promise<void> {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        // Validate file size
        if (file.size > this.MAX_FILE_SIZE) {
            throw new BadRequestException(
                `File size exceeds maximum allowed size of 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
            );
        }

        // Validate MIME type (from request header)
        if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new BadRequestException(
                `Invalid file type. Only images (jpg, jpeg, png, gif, webp) are allowed. You uploaded: ${file.mimetype}`,
            );
        }

        // Validate file extension
        const ext = path.extname(file.originalname).toLowerCase();
        if (!this.ALLOWED_EXTENSIONS.includes(ext)) {
            throw new BadRequestException(
                `Invalid file extension. Only .jpg, .jpeg, .png, .gif, .webp are allowed. You uploaded: ${ext}`,
            );
        }

        // Validate file signature (magic number) - most important security check
        try {
            const fileType = await fileTypeFromBuffer(file.buffer);
            if (!fileType) {
                throw new BadRequestException(
                    'Unable to determine file type. File signature validation failed.',
                );
            }

            // Check if detected MIME type matches allowed types
            if (!this.ALLOWED_MIME_TYPES.includes(fileType.mime)) {
                throw new BadRequestException(
                    `File signature does not match declared type. Detected: ${fileType.mime}, declared: ${file.mimetype}`,
                );
            }

            // Additional check: ensure declared MIME type matches detected MIME type
            if (fileType.mime !== file.mimetype && fileType.mime !== 'image/jpeg' && file.mimetype === 'image/jpg') {
                // Allow jpg/jpeg mismatch as they are the same
                // This is fine
            } else if (fileType.mime !== file.mimetype) {
                throw new BadRequestException(
                    `File signature mismatch. Detected: ${fileType.mime}, declared: ${file.mimetype}`,
                );
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            // If file-type library fails, reject the file for security
            throw new BadRequestException(
                'File type validation failed. Unable to verify file signature.',
            );
        }
    }
}
