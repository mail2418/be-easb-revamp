import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class GenerateFilenameUseCase {
    execute(originalName: string): string {
        const timestamp = Date.now();
        const ext = path.extname(originalName);
        const nameWithoutExt = path.basename(originalName, ext);

        // Sanitize and truncate to 150 chars
        const sanitized = nameWithoutExt
            .replace(/[^a-zA-Z0-9-_]/g, '-')
            .substring(0, 150);

        return `${timestamp}-${sanitized}-bps${ext}`;
    }
}
