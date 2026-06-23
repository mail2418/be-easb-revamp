import { BadRequestException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Express } from 'express';
import { AsbTipeBangunanRepository } from '../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.repository';
import { AsbJenisRepository } from '../../../domain/asb_jenis/asb_jenis.repository';
import { AsbKlasifikasiRepository } from '../../../domain/asb_klasifikasi/asb_klasifikasi.repository';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';
import { JAKON_DATA_SHEET_NAME } from './generate_excel_template.use_case'; // Import locked sheet name

export interface ParsedJakonRow {
    idAsbTipeBangunan: number;
    idAsbJenis: number;
    idAsbKlasifikasi: number;
    type: AsbJakonType;
    nama: string;
    spec: string;
    priceFrom: number;
    priceTo: number;
    satuan: string;
    standard: number;
}

@Injectable()
export class ParseExcelDataUseCase {
    constructor(
        private readonly asbTipeBangunanRepository: AsbTipeBangunanRepository,
        private readonly asbJenisRepository: AsbJenisRepository,
        private readonly asbKlasifikasiRepository: AsbKlasifikasiRepository,
    ) {}

    async execute(file: Express.Multer.File): Promise<ParsedJakonRow[]> {
        // Read Excel file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file.buffer as any);

        // Only read from the locked sheet name
        const worksheet = workbook.getWorksheet(JAKON_DATA_SHEET_NAME);

        if (!worksheet) {
            throw new BadRequestException(
                `Sheet "${JAKON_DATA_SHEET_NAME}" tidak ditemukan. Pastikan nama sheet adalah "${JAKON_DATA_SHEET_NAME}" dan tidak diubah.`,
            );
        }

        // Convert to JSON with header row (same approach as SHST)
        const jsonData: Array<{
            tipe_bangunan?: string;
            'jenis usulan asb'?: string;
            klasifikasi?: string;
            type?: string;
            nama?: string;
            spec?: string;
            priceFrom?: number | string;
            priceTo?: number | string;
            satuan?: string;
            standard?: number | string;
        }> = [];

        const headers: string[] = [];
        let isFirstRow = true;

        worksheet.eachRow((row, rowNumber) => {
            if (isFirstRow) {
                // Get headers from first row
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    headers[colNumber - 1] = String(cell.value ?? '').trim();
                });
                isFirstRow = false;
            } else {
                // Get data from subsequent rows
                const rowData: any = {};
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

        const parsedRows: ParsedJakonRow[] = [];
        const errors: string[] = [];

        // Process each row
        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const rowNumber = i + 2; // +2 because row 1 is header, and array is 0-indexed

            try {
                // Skip header row (if tipe_bangunan equals "tipe_bangunan", it's likely the header)
                if (
                    row.tipe_bangunan &&
                    String(row.tipe_bangunan).trim().toLowerCase() === 'tipe_bangunan'
                ) {
                    continue; // Skip header row
                }

                // Get values from row (using consistent header names from template)
                const tipeBangunan = row.tipe_bangunan;
                const jenisUsulanAsb = row['jenis usulan asb'];
                const klasifikasi = row.klasifikasi;
                const type = row.type;
                const nama = row.nama;
                const spec = row.spec;
                const priceFrom = row.priceFrom;
                const priceTo = row.priceTo;
                const satuan = row.satuan;
                const standard = row.standard;

                // Validate required fields
                if (
                    !tipeBangunan ||
                    typeof tipeBangunan !== 'string' ||
                    tipeBangunan.trim() === ''
                ) {
                    errors.push(
                        `Row ${rowNumber}: tipe_bangunan is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (
                    !jenisUsulanAsb ||
                    typeof jenisUsulanAsb !== 'string' ||
                    jenisUsulanAsb.trim() === ''
                ) {
                    errors.push(
                        `Row ${rowNumber}: jenis usulan asb is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (!klasifikasi || typeof klasifikasi !== 'string' || klasifikasi.trim() === '') {
                    errors.push(
                        `Row ${rowNumber}: klasifikasi is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (!type || typeof type !== 'string' || type.trim() === '') {
                    errors.push(
                        `Row ${rowNumber}: type is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (!nama || typeof nama !== 'string' || nama.trim() === '') {
                    errors.push(
                        `Row ${rowNumber}: nama is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (!spec || typeof spec !== 'string' || spec.trim() === '') {
                    errors.push(
                        `Row ${rowNumber}: spec is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (priceFrom === null || priceFrom === undefined) {
                    errors.push(`Row ${rowNumber}: priceFrom is required`);
                    continue;
                }

                if (priceTo === null || priceTo === undefined) {
                    errors.push(`Row ${rowNumber}: priceTo is required`);
                    continue;
                }

                if (!satuan || typeof satuan !== 'string' || satuan.trim() === '') {
                    errors.push(
                        `Row ${rowNumber}: satuan is required and must be a non-empty string`,
                    );
                    continue;
                }

                if (standard === null || standard === undefined) {
                    errors.push(`Row ${rowNumber}: standard is required`);
                    continue;
                }

                // Parse numeric values - handle various formats
                let parsedPriceFrom: number;
                if (typeof priceFrom === 'number') {
                    parsedPriceFrom = priceFrom;
                } else {
                    const priceFromStr = String(priceFrom).trim();
                    if (priceFromStr === '') {
                        errors.push(`Row ${rowNumber}: priceFrom is required`);
                        continue;
                    }
                    const cleanedStr = priceFromStr.replace(/[^\d.-]/g, '');
                    if (cleanedStr === '' || cleanedStr === '-' || cleanedStr === '.') {
                        errors.push(
                            `Row ${rowNumber}: priceFrom must be a valid number. Received: "${priceFrom}"`,
                        );
                        continue;
                    }
                    parsedPriceFrom = parseFloat(cleanedStr);
                }

                if (isNaN(parsedPriceFrom)) {
                    errors.push(
                        `Row ${rowNumber}: priceFrom must be a valid number. Received: "${priceFrom}" (parsed as NaN)`,
                    );
                    continue;
                }

                if (parsedPriceFrom < 0) {
                    errors.push(
                        `Row ${rowNumber}: priceFrom must be a non-negative number. Received: "${priceFrom}" (parsed as ${parsedPriceFrom})`,
                    );
                    continue;
                }

                let parsedPriceTo: number;
                if (typeof priceTo === 'number') {
                    parsedPriceTo = priceTo;
                } else {
                    const priceToStr = String(priceTo).trim();
                    if (priceToStr === '') {
                        errors.push(`Row ${rowNumber}: priceTo is required`);
                        continue;
                    }
                    const cleanedStr = priceToStr.replace(/[^\d.-]/g, '');
                    if (cleanedStr === '' || cleanedStr === '-' || cleanedStr === '.') {
                        errors.push(
                            `Row ${rowNumber}: priceTo must be a valid number. Received: "${priceTo}"`,
                        );
                        continue;
                    }
                    parsedPriceTo = parseFloat(cleanedStr);
                }

                if (isNaN(parsedPriceTo)) {
                    errors.push(
                        `Row ${rowNumber}: priceTo must be a valid number. Received: "${priceTo}" (parsed as NaN)`,
                    );
                    continue;
                }

                if (parsedPriceTo < 0) {
                    errors.push(
                        `Row ${rowNumber}: priceTo must be a non-negative number. Received: "${priceTo}" (parsed as ${parsedPriceTo})`,
                    );
                    continue;
                }

                if (parsedPriceTo < parsedPriceFrom) {
                    errors.push(
                        `Row ${rowNumber}: priceTo must be greater than or equal to priceFrom`,
                    );
                    continue;
                }

                let parsedStandard: number;
                if (typeof standard === 'number') {
                    parsedStandard = standard;
                } else {
                    const standardStr = String(standard).trim();
                    if (standardStr === '') {
                        errors.push(`Row ${rowNumber}: standard is required`);
                        continue;
                    }
                    const cleanedStr = standardStr.replace(/[^\d.-]/g, '');
                    if (cleanedStr === '' || cleanedStr === '-' || cleanedStr === '.') {
                        errors.push(
                            `Row ${rowNumber}: standard must be a valid number. Received: "${standard}"`,
                        );
                        continue;
                    }
                    parsedStandard = parseFloat(cleanedStr);
                }

                if (isNaN(parsedStandard)) {
                    errors.push(
                        `Row ${rowNumber}: standard must be a valid number. Received: "${standard}" (parsed as NaN)`,
                    );
                    continue;
                }

                if (parsedStandard <= 0) {
                    errors.push(
                        `Row ${rowNumber}: standard must be a positive number. Received: "${standard}" (parsed as ${parsedStandard})`,
                    );
                    continue;
                }

                // Validate and parse type enum
                const typeValue = type.trim().toLowerCase();
                if (!Object.values(AsbJakonType).includes(typeValue as AsbJakonType)) {
                    errors.push(
                        `Row ${rowNumber}: type "${type}" is invalid. Must be one of: ${Object.values(AsbJakonType).join(', ')}`,
                    );
                    continue;
                }

                // Lookup tipe_bangunan
                const tipeBangunanEntity = await this.asbTipeBangunanRepository.findByTipeBangunan(
                    tipeBangunan.trim(),
                );
                if (!tipeBangunanEntity) {
                    errors.push(`Row ${rowNumber}: tipe_bangunan "${tipeBangunan}" not found`);
                    continue;
                }

                // Lookup jenis usulan asb (asb_jenis)
                const asbJenisEntity = await this.asbJenisRepository.findByJenis(
                    jenisUsulanAsb.trim(),
                );
                if (!asbJenisEntity) {
                    errors.push(`Row ${rowNumber}: jenis usulan asb "${jenisUsulanAsb}" not found`);
                    continue;
                }

                // Lookup klasifikasi
                const klasifikasiEntity = await this.asbKlasifikasiRepository.findByKlasifikasi(
                    klasifikasi.trim(),
                );
                if (!klasifikasiEntity) {
                    errors.push(`Row ${rowNumber}: klasifikasi "${klasifikasi}" not found`);
                    continue;
                }

                // Validate that klasifikasi belongs to the selected tipe_bangunan
                if (klasifikasiEntity.id_asb_tipe_bangunan !== tipeBangunanEntity.id) {
                    errors.push(
                        `Row ${rowNumber}: klasifikasi "${klasifikasi}" tidak terikat dengan tipe_bangunan "${tipeBangunan}". ` +
                            `Klasifikasi "${klasifikasi}" terikat dengan tipe bangunan yang berbeda.`,
                    );
                    continue;
                }

                // Satuan is now a free text field, no lookup needed
                // Just use the string value directly

                // Add parsed row
                parsedRows.push({
                    idAsbTipeBangunan: tipeBangunanEntity.id,
                    idAsbJenis: asbJenisEntity.id,
                    idAsbKlasifikasi: klasifikasiEntity.id,
                    type: typeValue as AsbJakonType,
                    nama: nama.trim(),
                    spec: spec.trim(),
                    priceFrom: parsedPriceFrom,
                    priceTo: parsedPriceTo,
                    satuan: satuan.trim(), // Use the string value directly
                    standard: parsedStandard,
                });
            } catch (error) {
                errors.push(
                    `Row ${rowNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`,
                );
            }
        }

        // If there are errors, throw them
        if (errors.length > 0) {
            throw new BadRequestException(`Validation errors found:\n${errors.join('\n')}`);
        }

        // If no valid rows found
        if (parsedRows.length === 0) {
            throw new BadRequestException('No valid data rows found in Excel file');
        }

        return parsedRows;
    }
}
