import { BadRequestException, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Express } from 'express';
import { AsbTipeBangunanRepository } from '../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.repository';
import { AsbJenisRepository } from '../../../domain/asb_jenis/asb_jenis.repository';
import { AsbKlasifikasiRepository } from '../../../domain/asb_klasifikasi/asb_klasifikasi.repository';
import { SatuanRepository } from '../../../domain/satuan/satuan.repository';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

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
        private readonly satuanRepository: SatuanRepository,
    ) {}

    async execute(file: Express.Multer.File): Promise<ParsedJakonRow[]> {
        // Read Excel file
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        
        // Only read from the locked sheet name
        const expectedSheetName = 'Jakon Data';
        if (!workbook.SheetNames.includes(expectedSheetName)) {
            throw new BadRequestException(
                `Sheet "${expectedSheetName}" tidak ditemukan. Pastikan nama sheet adalah "${expectedSheetName}" dan tidak diubah.`
            );
        }
        
        const worksheet = workbook.Sheets[expectedSheetName];

        // Convert to JSON - XLSX will use first row as headers
        // We need to handle the header "jenis usulan asb" which has spaces
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            defval: null,
        }) as Array<{
            [key: string]: any; // Dynamic keys based on Excel headers
        }>;

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
                // Get values from row (handle different header formats)
                const tipeBangunan = row['tipe_bangunan'] || row['Tipe Bangunan'] || row['tipe bangunan'];
                const jenisUsulanAsb = row['jenis usulan asb'] || row['Jenis Usulan ASB'] || row['jenis_usulan_asb'] || row['Jenis Usulan Asb'];
                const klasifikasi = row['klasifikasi'] || row['Klasifikasi'];
                const type = row['type'] || row['Type'] || row['TYPE'];
                const nama = row['nama'] || row['Nama'];
                const spec = row['spec'] || row['Spec'] || row['SPEC'];
                const priceFrom = row['priceFrom'] || row['pricefrom'] || row['PriceFrom'] || row['price_from'];
                const priceTo = row['priceTo'] || row['priceto'] || row['PriceTo'] || row['price_to'];
                const satuan = row['satuan'] || row['Satuan'];
                const standard = row['standard'] || row['Standard'] || row['STANDARD'];

                // Validate required fields
                if (!tipeBangunan || typeof tipeBangunan !== 'string' || tipeBangunan.toString().trim() === '') {
                    errors.push(`Row ${rowNumber}: tipe_bangunan is required and must be a non-empty string`);
                    continue;
                }

                if (!jenisUsulanAsb || typeof jenisUsulanAsb !== 'string' || jenisUsulanAsb.toString().trim() === '') {
                    errors.push(`Row ${rowNumber}: jenis usulan asb is required and must be a non-empty string`);
                    continue;
                }

                if (!klasifikasi || typeof klasifikasi !== 'string' || klasifikasi.toString().trim() === '') {
                    errors.push(`Row ${rowNumber}: klasifikasi is required and must be a non-empty string`);
                    continue;
                }

                if (!type || typeof type !== 'string' || type.toString().trim() === '') {
                    errors.push(`Row ${rowNumber}: type is required and must be a non-empty string`);
                    continue;
                }

                if (!nama || typeof nama !== 'string' || nama.toString().trim() === '') {
                    errors.push(`Row ${rowNumber}: nama is required and must be a non-empty string`);
                    continue;
                }

                if (!spec || typeof spec !== 'string' || spec.toString().trim() === '') {
                    errors.push(`Row ${rowNumber}: spec is required and must be a non-empty string`);
                    continue;
                }

                if (priceFrom === null || priceFrom === undefined || priceFrom === '') {
                    errors.push(`Row ${rowNumber}: priceFrom is required`);
                    continue;
                }

                if (priceTo === null || priceTo === undefined || priceTo === '') {
                    errors.push(`Row ${rowNumber}: priceTo is required`);
                    continue;
                }

                if (!satuan || typeof satuan !== 'string' || satuan.toString().trim() === '') {
                    errors.push(`Row ${rowNumber}: satuan is required and must be a non-empty string`);
                    continue;
                }

                if (standard === null || standard === undefined || standard === '') {
                    errors.push(`Row ${rowNumber}: standard is required`);
                    continue;
                }

                // Parse numeric values
                const parsedPriceFrom = typeof priceFrom === 'number' 
                    ? priceFrom 
                    : parseFloat(String(priceFrom).replace(/[^\d.-]/g, ''));

                if (isNaN(parsedPriceFrom) || parsedPriceFrom < 0) {
                    errors.push(`Row ${rowNumber}: priceFrom must be a non-negative number`);
                    continue;
                }

                const parsedPriceTo = typeof priceTo === 'number' 
                    ? priceTo 
                    : parseFloat(String(priceTo).replace(/[^\d.-]/g, ''));

                if (isNaN(parsedPriceTo) || parsedPriceTo < 0) {
                    errors.push(`Row ${rowNumber}: priceTo must be a non-negative number`);
                    continue;
                }

                if (parsedPriceTo < parsedPriceFrom) {
                    errors.push(`Row ${rowNumber}: priceTo must be greater than or equal to priceFrom`);
                    continue;
                }

                const parsedStandard = typeof standard === 'number' 
                    ? standard 
                    : parseFloat(String(standard).replace(/[^\d.-]/g, ''));

                if (isNaN(parsedStandard) || parsedStandard <= 0) {
                    errors.push(`Row ${rowNumber}: standard must be a positive number`);
                    continue;
                }

                // Validate and parse type enum
                const typeValue = type.toString().trim().toLowerCase();
                if (!Object.values(AsbJakonType).includes(typeValue as AsbJakonType)) {
                    errors.push(`Row ${rowNumber}: type "${type}" is invalid. Must be one of: ${Object.values(AsbJakonType).join(', ')}`);
                    continue;
                }

                // Lookup tipe_bangunan
                const tipeBangunanEntity = await this.asbTipeBangunanRepository.findByTipeBangunan(
                    tipeBangunan.toString().trim()
                );
                if (!tipeBangunanEntity) {
                    errors.push(`Row ${rowNumber}: tipe_bangunan "${tipeBangunan}" not found`);
                    continue;
                }

                // Lookup jenis usulan asb (asb_jenis)
                const asbJenisEntity = await this.asbJenisRepository.findByJenis(
                    jenisUsulanAsb.toString().trim()
                );
                if (!asbJenisEntity) {
                    errors.push(`Row ${rowNumber}: jenis usulan asb "${jenisUsulanAsb}" not found`);
                    continue;
                }

                // Lookup klasifikasi
                const klasifikasiEntity = await this.asbKlasifikasiRepository.findByKlasifikasi(
                    klasifikasi.toString().trim()
                );
                if (!klasifikasiEntity) {
                    errors.push(`Row ${rowNumber}: klasifikasi "${klasifikasi}" not found`);
                    continue;
                }

                // Validate that klasifikasi belongs to the selected tipe_bangunan
                if (klasifikasiEntity.id_asb_tipe_bangunan !== tipeBangunanEntity.id) {
                    errors.push(
                        `Row ${rowNumber}: klasifikasi "${klasifikasi}" tidak terikat dengan tipe_bangunan "${tipeBangunan}". ` +
                        `Klasifikasi "${klasifikasi}" terikat dengan tipe bangunan yang berbeda.`
                    );
                    continue;
                }

                // Lookup satuan
                const satuanEntity = await this.satuanRepository.findBySatuan(
                    satuan.toString().trim()
                );
                if (!satuanEntity) {
                    errors.push(`Row ${rowNumber}: satuan "${satuan}" not found`);
                    continue;
                }

                // Add parsed row
                parsedRows.push({
                    idAsbTipeBangunan: tipeBangunanEntity.id,
                    idAsbJenis: asbJenisEntity.id,
                    idAsbKlasifikasi: klasifikasiEntity.id,
                    type: typeValue as AsbJakonType,
                    nama: nama.toString().trim(),
                    spec: spec.toString().trim(),
                    priceFrom: parsedPriceFrom,
                    priceTo: parsedPriceTo,
                    satuan: satuanEntity.satuan,
                    standard: parsedStandard,
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

        return parsedRows;
    }
}

