import { BadRequestException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ValidateExcelHeadersUseCase {
    private readonly REQUIRED_HEADERS = [
        'id_ruang_lingkup',
        'no_mata_pembayaran',
        'satuan',
        'harga_satuan',
        'uraian',
        'tahun_anggaran',
    ];
    private readonly REQUIRED_HEADERS_COUNT = 6;
    private readonly EXPECTED_SHEET_NAME = 'HSPK Data';

    execute(workbook: ExcelJS.Workbook): void {
        const worksheet = workbook.getWorksheet(this.EXPECTED_SHEET_NAME);

        if (!worksheet) {
            throw new BadRequestException(
                `Sheet "${this.EXPECTED_SHEET_NAME}" tidak ditemukan. Pastikan nama sheet adalah "${this.EXPECTED_SHEET_NAME}" dan tidak diubah.`,
            );
        }

        const firstRow = worksheet.getRow(1);

        if (!firstRow || firstRow.cellCount === 0) {
            throw new BadRequestException('Excel file is empty');
        }

        const headers: string[] = [];
        firstRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            headers[colNumber - 1] = String(cell.value ?? '').trim();
        });

        if (!headers || headers.length === 0) {
            throw new BadRequestException('Excel file must have headers in the first row');
        }

        const normalizedHeaders = headers
            .map((h) => h?.toString().trim().toLowerCase())
            .filter((h) => h);

        if (normalizedHeaders.length !== this.REQUIRED_HEADERS_COUNT) {
            throw new BadRequestException(
                `Excel file must have exactly ${this.REQUIRED_HEADERS_COUNT} columns: ${this.REQUIRED_HEADERS.join(', ')}. Found ${normalizedHeaders.length} columns.`,
            );
        }

        const missingHeaders: string[] = [];
        for (const requiredHeader of this.REQUIRED_HEADERS) {
            if (!normalizedHeaders.includes(requiredHeader.toLowerCase())) {
                missingHeaders.push(requiredHeader);
            }
        }

        if (missingHeaders.length > 0) {
            throw new BadRequestException(
                `Missing required headers: ${missingHeaders.join(', ')}. Required headers are: ${this.REQUIRED_HEADERS.join(', ')}`,
            );
        }

        const extraHeaders = normalizedHeaders.filter((h) => !this.REQUIRED_HEADERS.includes(h));
        if (extraHeaders.length > 0) {
            throw new BadRequestException(
                `Extra headers found: ${extraHeaders.join(', ')}. Only allowed headers are: ${this.REQUIRED_HEADERS.join(', ')}`,
            );
        }
    }
}
