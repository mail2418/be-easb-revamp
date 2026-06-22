import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EnsureProfileUploadDirectoryUseCase {
    private readonly UPLOAD_DIR = path.join(process.env.UPLOAD_DIR || 'public', 'profiles');

    execute(): void {
        if (!fs.existsSync(this.UPLOAD_DIR)) {
            fs.mkdirSync(this.UPLOAD_DIR, { recursive: true });
        }
    }

    getUploadDirectory(): string {
        this.execute();
        return this.UPLOAD_DIR;
    }
}
