import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class GenerateExcelTemplateUseCase {
    execute(): Buffer {
        // Create workbook
        const workbook = XLSX.utils.book_new();

        // Define headers
        const headers = [
            'tipe_bangunan',
            'jenis usulan asb',
            'klasifikasi',
            'type',
            'nama',
            'spec',
            'priceFrom',
            'priceTo',
            'satuan',
            'standard'
        ];

        // Create worksheet data with header only
        const worksheetData = [
            headers, // Header row
        ];

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Set column widths for better readability
        worksheet['!cols'] = [
            { wch: 20 }, // tipe_bangunan
            { wch: 20 }, // jenis usulan asb
            { wch: 15 }, // klasifikasi
            { wch: 15 }, // type
            { wch: 30 }, // nama
            { wch: 30 }, // spec
            { wch: 15 }, // priceFrom
            { wch: 15 }, // priceTo
            { wch: 12 }, // satuan
            { wch: 15 }, // standard
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
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Jakon Data');

        // Generate buffer
        const buffer = XLSX.write(workbook, { 
            type: 'buffer', 
            bookType: 'xlsx',
            cellStyles: true,
        });

        return buffer;
    }
}

