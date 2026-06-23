import { BadRequestException, Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as path from 'path';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class ValidateDocumentUploadUseCase {
    private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private readonly ALLOWED_MIME_TYPES = [
        'application/pdf',
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    ];
    private readonly ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

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
                `Invalid file type. Only documents (PDF, DOC, DOCX) are allowed. You uploaded: ${file.mimetype}`,
            );
        }

        // Validate file extension
        const ext = path.extname(file.originalname).toLowerCase();
        if (!this.ALLOWED_EXTENSIONS.includes(ext)) {
            throw new BadRequestException(
                `Invalid file extension. Only .pdf, .doc, .docx are allowed. You uploaded: ${ext}`,
            );
        }

        // Validate file signature (magic number) - most important security check
        try {
            const fileType = await fileTypeFromBuffer(file.buffer);
            if (!fileType) {
                // Some file types (like .doc) may not be detected by file-type
                // For .doc files, we'll rely on extension and MIME type validation
                if (ext === '.doc' && file.mimetype === 'application/msword') {
                    // Allow .doc files even if file-type can't detect them
                    return;
                }
                throw new BadRequestException(
                    'Unable to determine file type. File signature validation failed.',
                );
            }

            // For PDF files, file-type should detect them
            if (fileType.mime === 'application/pdf') {
                if (file.mimetype !== 'application/pdf') {
                    throw new BadRequestException(
                        `File signature mismatch. Detected: ${fileType.mime}, declared: ${file.mimetype}`,
                    );
                }
            }
            // For DOCX files, file-type detects them as ZIP (because DOCX is a ZIP archive)
            // So we need special handling
            else if (
                ext === '.docx' &&
                file.mimetype ===
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ) {
                // DOCX files are ZIP archives, so file-type will detect them as application/zip
                // This is expected and acceptable
                if (fileType.mime !== 'application/zip' && fileType.mime !== file.mimetype) {
                    throw new BadRequestException(
                        `File signature mismatch. Expected DOCX file, detected: ${fileType.mime}`,
                    );
                }
            }
            // For DOC files, file-type may not detect them reliably
            else if (ext === '.doc' && file.mimetype === 'application/msword') {
                // DOC files have various formats, file-type may not detect them
                // We'll allow them if extension and MIME type match
                return;
            } else {
                // For other cases, ensure detected type matches declared type
                if (!this.ALLOWED_MIME_TYPES.includes(fileType.mime)) {
                    throw new BadRequestException(
                        `File signature does not match declared type. Detected: ${fileType.mime}, declared: ${file.mimetype}`,
                    );
                }
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
