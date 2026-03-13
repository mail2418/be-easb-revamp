import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class HandleShstFileUseCase {
  async saveFile(file: Express.Multer.File, filename: string): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', 'shst');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filePath, file.buffer);
    
    return `/shst/${filename}`;
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(process.cwd(), 'public', filePath);
      if (fs.existsSync(fullPath)) {
        await fs.promises.unlink(fullPath);
      }
    } catch (error) {
      // Log error but don't throw - file cleanup failure shouldn't break the deletion
      console.warn(`Failed to delete file ${filePath}:`, error.message);
    }
  }
}
