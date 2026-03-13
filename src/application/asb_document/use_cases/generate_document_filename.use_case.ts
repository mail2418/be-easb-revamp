import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';

@Injectable()
export class GenerateDocumentFilenameUseCase {
    execute(originalName: string, spec: DocumentSpec): string {
        const timestamp = Date.now();
        const ext = path.extname(originalName);
        const nameWithoutExt = path.basename(originalName, ext);

        // Sanitize and truncate to 150 chars
        const sanitized = nameWithoutExt
            .replace(/[^a-zA-Z0-9-_]/g, '-')
            .substring(0, 150);

        // Include spec in filename
        return `${timestamp}-${sanitized}-${spec}${ext}`;
    }
}
