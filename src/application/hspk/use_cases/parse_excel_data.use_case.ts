import { BadRequestException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Express } from 'express';
import { JalanSaluranRuangLingkupService } from '../../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service';
import { CreateHspkDto } from '../../../presentation/hspk/dto/create_hspk.dto';

const EXPECTED_SHEET_NAME = 'HSPK Data';

@Injectable()
export class ParseExcelDataUseCase {
    constructor(
        private readonly jalanSaluranRuangLingkupService: JalanSaluranRuangLingkupService,
    ) {}

    async execute(file: Express.Multer.File): Promise<CreateHspkDto[]> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file.buffer as any);

        const worksheet = workbook.getWorksheet(EXPECTED_SHEET_NAME);

        if (!worksheet) {
            throw new BadRequestException(
                `Sheet "${EXPECTED_SHEET_NAME}" tidak ditemukan. Pastikan nama sheet adalah "${EXPECTED_SHEET_NAME}" dan tidak diubah.`,
            );
        }

        const jsonData: Array<Record<string, unknown>> = [];

        const headers: string[] = [];
        let isFirstRow = true;

        worksheet.eachRow((row) => {
            if (isFirstRow) {
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    headers[colNumber - 1] = String(cell.value ?? '')
                        .trim()
                        .toLowerCase();
                });
                isFirstRow = false;
            } else {
                const rowData: Record<string, unknown> = {};
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    const headerName = headers[colNumber - 1];
                    if (headerName) {
                        rowData[headerName] = cell.value ?? null;
                    }
                });
                jsonData.push(rowData);
            }
        });

        if (!jsonData || jsonData.length === 0) {
            throw new BadRequestException('Excel file contains no data rows');
        }

        const parsedRows: CreateHspkDto[] = [];
        const errors: string[] = [];
        const seenInFile = new Set<string>();

        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const rowNumber = i + 2;

            try {
                if (
                    row.id_ruang_lingkup !== undefined &&
                    row.id_ruang_lingkup !== null &&
                    String(row.id_ruang_lingkup).trim().toLowerCase() === 'id_ruang_lingkup'
                ) {
                    continue;
                }

                const idRuangLingkup = this.parsePositiveInt(
                    row.id_ruang_lingkup,
                    'id_ruang_lingkup',
                    rowNumber,
                    errors,
                );
                if (idRuangLingkup === null) {
                    continue;
                }

                const ruangLingkup =
                    await this.jalanSaluranRuangLingkupService.findById(idRuangLingkup);
                if (!ruangLingkup) {
                    errors.push(`Row ${rowNumber}: id_ruang_lingkup ${idRuangLingkup} not found`);
                    continue;
                }

                if (
                    !row.no_mata_pembayaran ||
                    typeof row.no_mata_pembayaran !== 'string' ||
                    row.no_mata_pembayaran.trim() === ''
                ) {
                    errors.push(
                        `Row ${rowNumber}: no_mata_pembayaran is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (!row.satuan || typeof row.satuan !== 'string' || row.satuan.trim() === '') {
                    errors.push(
                        `Row ${rowNumber}: satuan is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (row.harga_satuan === null || row.harga_satuan === undefined) {
                    errors.push(`Row ${rowNumber}: harga_satuan is required`);
                    continue;
                }

                const hargaSatuan = this.parseNonNegativeNumber(
                    row.harga_satuan,
                    'harga_satuan',
                    rowNumber,
                    errors,
                );
                if (hargaSatuan === null) {
                    continue;
                }

                const tahunAnggaran = this.parseTahunAnggaran(
                    row.tahun_anggaran,
                    rowNumber,
                    errors,
                );
                if (tahunAnggaran === null) {
                    continue;
                }

                const noMataKey = row.no_mata_pembayaran.trim();
                const dedupeKey = `${tahunAnggaran}::${noMataKey}`;
                if (seenInFile.has(dedupeKey)) {
                    errors.push(
                        `Row ${rowNumber}: duplicate no_mata_pembayaran "${noMataKey}" for tahun_anggaran ${tahunAnggaran} in this file`,
                    );
                    continue;
                }
                seenInFile.add(dedupeKey);

                let uraian: string | null = null;
                if (
                    row.uraian !== undefined &&
                    row.uraian !== null &&
                    String(row.uraian).trim() !== ''
                ) {
                    uraian = String(row.uraian).trim();
                }

                const dto: CreateHspkDto = {
                    id_ruang_lingkup: idRuangLingkup,
                    tahun_anggaran: tahunAnggaran,
                    no_mata_pembayaran: noMataKey,
                    satuan: row.satuan.trim(),
                    harga_satuan: hargaSatuan,
                };
                if (uraian !== null) {
                    dto.uraian = uraian;
                }
                parsedRows.push(dto);
            } catch (error) {
                errors.push(
                    `Row ${rowNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`,
                );
            }
        }

        if (errors.length > 0) {
            throw new BadRequestException(`Validation errors found:\n${errors.join('\n')}`);
        }

        if (parsedRows.length === 0) {
            throw new BadRequestException('No valid data rows found in Excel file');
        }

        return parsedRows;
    }

    private parsePositiveInt(
        value: unknown,
        field: string,
        rowNumber: number,
        errors: string[],
    ): number | null {
        if (value === null || value === undefined) {
            errors.push(`Row ${rowNumber}: ${field} is required`);
            return null;
        }
        let n: number;
        if (typeof value === 'number') {
            n = Math.round(value);
        } else {
            const s = String(value).trim();
            if (s === '') {
                errors.push(`Row ${rowNumber}: ${field} is required`);
                return null;
            }
            n = parseInt(s, 10);
        }
        if (isNaN(n) || n < 1) {
            errors.push(
                `Row ${rowNumber}: ${field} must be a positive integer. Received: "${value}"`,
            );
            return null;
        }
        return n;
    }

    private parseTahunAnggaran(value: unknown, rowNumber: number, errors: string[]): number | null {
        if (value === null || value === undefined) {
            errors.push(`Row ${rowNumber}: tahun_anggaran is required`);
            return null;
        }
        let n: number;
        if (typeof value === 'number') {
            n = Math.round(value);
        } else {
            const s = String(value).trim();
            if (s === '') {
                errors.push(`Row ${rowNumber}: tahun_anggaran is required`);
                return null;
            }
            n = parseInt(s, 10);
        }
        if (isNaN(n)) {
            errors.push(
                `Row ${rowNumber}: tahun_anggaran must be a valid integer. Received: "${value}"`,
            );
            return null;
        }
        if (n < 2000 || n > 2100) {
            errors.push(
                `Row ${rowNumber}: tahun_anggaran must be between 2000 and 2100. Received: ${n}`,
            );
            return null;
        }
        return n;
    }

    private parseNonNegativeNumber(
        value: unknown,
        field: string,
        rowNumber: number,
        errors: string[],
    ): number | null {
        let n: number;
        if (typeof value === 'number') {
            n = value;
        } else {
            const raw = String(value).trim();
            if (raw === '') {
                errors.push(`Row ${rowNumber}: ${field} is required`);
                return null;
            }
            const cleanedStr = raw.replace(/[^\d.-]/g, '');
            if (cleanedStr === '' || cleanedStr === '-' || cleanedStr === '.') {
                errors.push(
                    `Row ${rowNumber}: ${field} must be a valid number. Received: "${value}"`,
                );
                return null;
            }
            n = parseFloat(cleanedStr);
        }
        if (isNaN(n)) {
            errors.push(`Row ${rowNumber}: ${field} must be a valid number. Received: "${value}"`);
            return null;
        }
        if (n < 0) {
            errors.push(`Row ${rowNumber}: ${field} must be >= 0. Received: ${n}`);
            return null;
        }
        return n;
    }
}
