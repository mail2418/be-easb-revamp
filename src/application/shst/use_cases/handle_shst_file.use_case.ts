import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class HandleShstFileUseCase {
    /**
     * Generate filename with format: YYYYMMDDHHmm-{nama_kabkota}-shst{tahun}.{ext}
     * Note: Without seconds
     */
    generateFilename(file: Express.Multer.File, namaKabkota: string, tahun: number): string {
        const now = new Date();

        // Format each component in Jakarta timezone
        const yearFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
        });
        const monthFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            month: '2-digit',
        });
        const dayFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            day: '2-digit',
        });
        const hourFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            hour12: false,
        });
        const minuteFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            minute: '2-digit',
        });

        const year = yearFormatter.format(now);
        const month = monthFormatter.format(now).padStart(2, '0');
        const day = dayFormatter.format(now).padStart(2, '0');
        const hour = hourFormatter.format(now).padStart(2, '0');
        const minute = minuteFormatter.format(now).padStart(2, '0');

        const timestamp = `${year}${month}${day}${hour}${minute}`;

        const originalExtension = file.originalname.split('.').pop() || 'xlsx';
        // Sanitize nama_kabkota for filename (remove special characters, replace spaces with underscore)
        const sanitizedNamaKabkota = namaKabkota
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 100); // Limit length

        return `${timestamp}-${sanitizedNamaKabkota}-shst${tahun}.${originalExtension}`;
    }

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
            // File cleanup failure shouldn't break the deletion
        }
    }
}
