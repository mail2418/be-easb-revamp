import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class DeleteDocumentUseCase {
    execute(filepath: string): void {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
    }
}
