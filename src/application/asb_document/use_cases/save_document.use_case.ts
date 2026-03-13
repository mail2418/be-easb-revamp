import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';
import { GenerateDocumentFilenameUseCase } from './generate_document_filename.use_case';
import { EnsureDocumentDirectoryUseCase } from './ensure_document_directory.use_case';
import { Express } from 'express';

@Injectable()
export class SaveDocumentUseCase {
    constructor(
        private readonly generateFilename: GenerateDocumentFilenameUseCase,
        private readonly ensureDocumentDir: EnsureDocumentDirectoryUseCase,
    ) { }

    execute(file: Express.Multer.File, spec: DocumentSpec): string {
        const filename = this.generateFilename.execute(file.originalname, spec);
        const uploadDir = this.ensureDocumentDir.getUploadDirectory();
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, file.buffer);
        return filepath;
    }
}
