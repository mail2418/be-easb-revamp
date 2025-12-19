import { BadRequestException, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Express } from 'express';
import { AsbTipeBangunanRepository } from '../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.repository';
import { AsbKlasifikasiRepository } from '../../../domain/asb_klasifikasi/asb_klasifikasi.repository';
import { KabKotaRepository } from '../../../domain/kabkota/kabkota.repository';

export interface ParsedShstRow {
    id_asb_tipe_bangunan: number;
    id_asb_klasifikasi: number;
    id_kabkota: number;
    nominal: number;
}

export interface ParsedShstData {
    rows: ParsedShstRow[];
    namaKabkota: string; // Nama kabkota from first row for filename generation
}

@Injectable()
export class ParseExcelDataUseCase {
    constructor(
        private readonly asbTipeBangunanRepository: AsbTipeBangunanRepository,
        private readonly asbKlasifikasiRepository: AsbKlasifikasiRepository,
        private readonly kabKotaRepository: KabKotaRepository,
    ) {}

    async execute(file: Express.Multer.File): Promise<ParsedShstData> {
        // Read Excel file
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON with header row
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: ['tipe_bangunan', 'klasifikasi', 'kabkota', 'nominal'],
            defval: null,
        }) as Array<{
            tipe_bangunan?: string;
            klasifikasi?: string;
            kabkota?: string;
            nominal?: number | string;
        }>;

        if (!jsonData || jsonData.length === 0) {
            throw new BadRequestException('Excel file contains no data rows');
        }

        const parsedRows: ParsedShstRow[] = [];
        const errors: string[] = [];
        let namaKabkota: string | null = null;

        // Process each row
        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const rowNumber = i + 2; // +2 because row 1 is header, and array is 0-indexed

            try {
                // Validate required fields
                if (!row.tipe_bangunan || typeof row.tipe_bangunan !== 'string' || row.tipe_bangunan.trim() === '') {
                    errors.push(`Row ${rowNumber}: tipe_bangunan is required and must be a non-empty string`);
                    continue;
                }

                if (!row.klasifikasi || typeof row.klasifikasi !== 'string' || row.klasifikasi.trim() === '') {
                    errors.push(`Row ${rowNumber}: klasifikasi is required and must be a non-empty string`);
                    continue;
                }

                if (!row.kabkota || typeof row.kabkota !== 'string' || row.kabkota.trim() === '') {
                    errors.push(`Row ${rowNumber}: kabkota is required and must be a non-empty string`);
                    continue;
                }

                if (row.nominal === null || row.nominal === undefined || row.nominal === '') {
                    errors.push(`Row ${rowNumber}: nominal is required`);
                    continue;
                }

                // Parse nominal
                const nominal = typeof row.nominal === 'number' 
                    ? row.nominal 
                    : parseFloat(String(row.nominal).replace(/[^\d.-]/g, ''));

                if (isNaN(nominal) || nominal <= 0) {
                    errors.push(`Row ${rowNumber}: nominal must be a positive number`);
                    continue;
                }

                // Lookup tipe_bangunan
                const tipeBangunan = await this.asbTipeBangunanRepository.findByTipeBangunan(
                    row.tipe_bangunan.trim()
                );
                if (!tipeBangunan) {
                    errors.push(`Row ${rowNumber}: tipe_bangunan "${row.tipe_bangunan}" not found`);
                    continue;
                }

                // Lookup klasifikasi
                const klasifikasi = await this.asbKlasifikasiRepository.findByKlasifikasi(
                    row.klasifikasi.trim()
                );
                if (!klasifikasi) {
                    errors.push(`Row ${rowNumber}: klasifikasi "${row.klasifikasi}" not found`);
                    continue;
                }

                // Lookup kabkota
                const kabkota = await this.kabKotaRepository.findByNama(
                    row.kabkota.trim()
                );
                if (!kabkota) {
                    errors.push(`Row ${rowNumber}: kabkota "${row.kabkota}" not found`);
                    continue;
                }

                // Store nama kabkota from first valid row for filename generation
                if (!namaKabkota) {
                    namaKabkota = kabkota.nama;
                }

                // Add parsed row
                parsedRows.push({
                    id_asb_tipe_bangunan: tipeBangunan.id,
                    id_asb_klasifikasi: klasifikasi.id,
                    id_kabkota: kabkota.id,
                    nominal: nominal,
                });
            } catch (error) {
                errors.push(`Row ${rowNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }

        // If there are errors, throw them
        if (errors.length > 0) {
            throw new BadRequestException(
                `Validation errors found:\n${errors.join('\n')}`
            );
        }

        // If no valid rows found
        if (parsedRows.length === 0) {
            throw new BadRequestException('No valid data rows found in Excel file');
        }

        if (!namaKabkota) {
            throw new BadRequestException('Could not determine nama kabkota from Excel file');
        }

        return {
            rows: parsedRows,
            namaKabkota: namaKabkota,
        };
    }
}

