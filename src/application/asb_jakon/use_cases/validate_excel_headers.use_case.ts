import { BadRequestException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { JAKON_DATA_SHEET_NAME } from './generate_excel_template.use_case'; // Import locked sheet name

@Injectable()
export class ValidateExcelHeadersUseCase {
    private readonly REQUIRED_HEADERS = [
        'tipe_bangunan',
        'jenis usulan asb',
        'klasifikasi',
        'type',
        'nama',
        'spec',
        'pricefrom',
        'priceto',
        'satuan',
        'standard',
    ];
    private readonly REQUIRED_HEADERS_COUNT = 10;

    execute(workbook: ExcelJS.Workbook): void {
        // Validate locked sheet name
        const worksheet = workbook.getWorksheet(JAKON_DATA_SHEET_NAME);

        if (!worksheet) {
            throw new BadRequestException(
                `Sheet "${JAKON_DATA_SHEET_NAME}" tidak ditemukan. Pastikan nama sheet adalah "${JAKON_DATA_SHEET_NAME}" dan tidak diubah.`,
            );
        }

        // Get headers from first row
        const headers: string[] = [];
        const firstRow = worksheet.getRow(1);

        if (!firstRow || firstRow.cellCount === 0) {
            throw new BadRequestException('Excel file is empty');
        }

        firstRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            headers[colNumber - 1] = String(cell.value ?? '').trim();
        });

        if (!headers || headers.length === 0) {
            throw new BadRequestException('Excel file must have headers in the first row');
        }

        // Normalize headers (trim whitespace, convert to lowercase)
        const normalizedHeaders = headers
            .map((h) => h?.toString().trim().toLowerCase())
            .filter((h) => h);

        // Check if we have exactly the required headers
        if (normalizedHeaders.length !== this.REQUIRED_HEADERS_COUNT) {
            throw new BadRequestException(
                `Excel file must have exactly ${this.REQUIRED_HEADERS_COUNT} columns: ${this.REQUIRED_HEADERS.join(', ')}. Found ${normalizedHeaders.length} columns.`,
            );
        }

        // Check if all required headers are present (case-insensitive and flexible with spacing)
        const missingHeaders: string[] = [];
        const headerMap = new Map<string, string>();

        // Map normalized headers to their original case
        normalizedHeaders.forEach((h, idx) => {
            headerMap.set(h, headers[idx]);
        });

        for (const requiredHeader of this.REQUIRED_HEADERS) {
            const normalizedRequired = requiredHeader.toLowerCase();
            if (!normalizedHeaders.includes(normalizedRequired)) {
                missingHeaders.push(requiredHeader);
            }
        }

        if (missingHeaders.length > 0) {
            throw new BadRequestException(
                `Missing required headers: ${missingHeaders.join(', ')}. Required headers are: ${this.REQUIRED_HEADERS.join(', ')}`,
            );
        }

        // Check for extra headers (allow some flexibility)
        const extraHeaders = normalizedHeaders.filter(
            (h) => !this.REQUIRED_HEADERS.some((rh) => rh.toLowerCase() === h),
        );
        if (extraHeaders.length > 0) {
            throw new BadRequestException(
                `Extra headers found: ${extraHeaders.join(', ')}. Only allowed headers are: ${this.REQUIRED_HEADERS.join(', ')}`,
            );
        }
    }
}
