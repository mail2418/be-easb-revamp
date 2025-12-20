import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class GenerateExcelTemplateUseCase {
    execute(): Buffer {
        // Create workbook
        const workbook = XLSX.utils.book_new();

        // Define headers
        const headers = ['tipe_bangunan', 'klasifikasi', 'kabkota', 'nominal'];

        // Create worksheet data with header only
        // User will fill in their own data
        const worksheetData = [
            headers, // Header row
        ];

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Set column widths for better readability
        worksheet['!cols'] = [
            { wch: 25 }, // tipe_bangunan
            { wch: 20 }, // klasifikasi
            { wch: 25 }, // kabkota
            { wch: 18 }, // nominal
        ];

        // Style header row (bold with background color)
        const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
            if (!worksheet[cellAddress]) continue;
            worksheet[cellAddress].s = {
                font: { bold: true, color: { rgb: 'FFFFFF' } },
                fill: { fgColor: { rgb: '4472C4' } },
                alignment: { horizontal: 'center', vertical: 'center' },
            };
        }

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SHST Data');

        // Generate buffer
        const buffer = XLSX.write(workbook, { 
            type: 'buffer', 
            bookType: 'xlsx',
            cellStyles: true,
        });

        return buffer;
    }
}

