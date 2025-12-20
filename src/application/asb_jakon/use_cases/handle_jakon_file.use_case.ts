import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class HandleJakonFileUseCase {
  /**
   * Generate filename with format: YYYYMMDDHHmm-jakon{tahun}.{ext}
   * Note: Without seconds
   */
  generateFilename(file: Express.Multer.File, tahun: number): string {
    const now = new Date();
    const timestamp = 
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0');

    const originalExtension = file.originalname.split('.').pop() || 'xlsx';
    
    return `${timestamp}-jakon${tahun}.${originalExtension}`;
  }

  async saveFile(file: Express.Multer.File, filename: string): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', 'jakon');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filePath, file.buffer);
    
    return `/jakon/${filename}`;
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

