import { BadRequestException, Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as ExcelJS from 'exceljs';
import { AsbTipeBangunanRepository } from '../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.repository';
import { AsbKlasifikasiRepository } from '../../../domain/asb_klasifikasi/asb_klasifikasi.repository';
import { KabKotaRepository } from '../../../domain/kabkota/kabkota.repository';

export interface ParsedShstRow {
    tahun: number;
    id_asb_tipe_bangunan: number;
    id_asb_klasifikasi: number;
    id_kabkota: number;
    nominal: number;
}

@Injectable()
export class ParseExcelShstUseCase {
    constructor(
        private readonly asbTipeBangunanRepository: AsbTipeBangunanRepository,
        private readonly asbKlasifikasiRepository: AsbKlasifikasiRepository,
        private readonly kabKotaRepository: KabKotaRepository,
    ) {}

    async execute(file: Express.Multer.File, tahun: number): Promise<ParsedShstRow[]> {
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(file.buffer as any);
            const worksheet = workbook.worksheets[0];

            if (!worksheet) {
                throw new BadRequestException('Excel file must contain at least one worksheet');
            }

            // Convert worksheet to array of arrays
            const data: any[][] = [];
            worksheet.eachRow((row, rowNumber) => {
                const rowData: any[] = [];
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    rowData[colNumber - 1] = cell.value ?? null;
                });
                data.push(rowData);
            });

            if (data.length < 2) {
                throw new BadRequestException(
                    'Excel file must contain at least a header row and one data row',
                );
            }

            // Get headers from first row
            const headers = data[0] as string[];
            const headerMap: { [key: string]: number } = {};

            // Create header map (case-insensitive)
            headers.forEach((header, index) => {
                if (header) {
                    const normalizedHeader = String(header).trim().toLowerCase();
                    headerMap[normalizedHeader] = index;
                }
            });

            // Validate required headers exist
            const requiredHeaders = ['tipe_bangunan', 'klasifikasi', 'kabkota', 'nominal'];
            for (const requiredHeader of requiredHeaders) {
                if (!headerMap[requiredHeader]) {
                    throw new BadRequestException(`Required header '${requiredHeader}' not found`);
                }
            }

            // Parse data rows
            const parsedRows: ParsedShstRow[] = [];
            const errors: string[] = [];

            for (let i = 1; i < data.length; i++) {
                const row = data[i] as any[];

                // Skip empty rows
                if (
                    !row ||
                    row.every(
                        (cell) => cell === null || cell === undefined || String(cell).trim() === '',
                    )
                ) {
                    continue;
                }

                try {
                    const tipeBangunanStr = String(row[headerMap['tipe_bangunan']] || '').trim();
                    const klasifikasiStr = String(row[headerMap['klasifikasi']] || '').trim();
                    const kabkotaStr = String(row[headerMap['kabkota']] || '').trim();
                    const nominalStr = String(row[headerMap['nominal']] || '').trim();

                    // Validate all fields are present
                    if (!tipeBangunanStr || !klasifikasiStr || !kabkotaStr || !nominalStr) {
                        errors.push(`Row ${i + 1}: Missing required fields`);
                        continue;
                    }

                    // Lookup tipe_bangunan
                    const tipeBangunan =
                        await this.asbTipeBangunanRepository.findByTipeBangunan(tipeBangunanStr);
                    if (!tipeBangunan) {
                        errors.push(`Row ${i + 1}: Tipe bangunan '${tipeBangunanStr}' not found`);
                        continue;
                    }

                    // Lookup klasifikasi
                    const klasifikasi =
                        await this.asbKlasifikasiRepository.findByKlasifikasi(klasifikasiStr);
                    if (!klasifikasi) {
                        errors.push(`Row ${i + 1}: Klasifikasi '${klasifikasiStr}' not found`);
                        continue;
                    }

                    // Lookup kabkota by nama
                    const kabkota = await this.kabKotaRepository.findByNama(kabkotaStr);
                    if (!kabkota) {
                        errors.push(`Row ${i + 1}: Kabupaten/Kota '${kabkotaStr}' not found`);
                        continue;
                    }

                    // Parse nominal
                    const nominal = parseFloat(nominalStr.replace(/[^\d.-]/g, '')); // Remove currency symbols, commas, etc.
                    if (isNaN(nominal) || nominal <= 0) {
                        errors.push(`Row ${i + 1}: Invalid nominal value '${nominalStr}'`);
                        continue;
                    }

                    parsedRows.push({
                        tahun,
                        id_asb_tipe_bangunan: tipeBangunan.id,
                        id_asb_klasifikasi: klasifikasi.id,
                        id_kabkota: kabkota.id,
                        nominal,
                    });
                } catch (error) {
                    errors.push(
                        `Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    );
                }
            }

            if (parsedRows.length === 0) {
                throw new BadRequestException(
                    `No valid data rows found in Excel file.${errors.length > 0 ? ` Errors: ${errors.join('; ')}` : ''}`,
                );
            }

            if (errors.length > 0) {
                // Some rows had errors but we have at least some valid rows
            }

            return parsedRows;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException(
                `Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        }
    }
}
