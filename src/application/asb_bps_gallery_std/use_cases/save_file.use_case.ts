import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { GenerateFilenameUseCase } from './generate_filename.use_case';
import { EnsureUploadDirectoryUseCase } from './ensure_upload_directory.use_case';
import { Express } from 'express';

@Injectable()
export class SaveFileUseCase {
    constructor(
        private readonly generateFilename: GenerateFilenameUseCase,
        private readonly ensureUploadDir: EnsureUploadDirectoryUseCase,
    ) { }

    execute(file: Express.Multer.File): string {
        const filename = this.generateFilename.execute(file.originalname);
        const uploadDir = this.ensureUploadDir.getUploadDirectory();
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, file.buffer);
        return filepath;
    }
}
