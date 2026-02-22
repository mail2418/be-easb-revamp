import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { AsbTipeBangunanService } from '../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.service';
import { AsbKlasifikasiService } from '../../../domain/asb_klasifikasi/asb_klasifikasi.service';
import { KabKotaService } from '../../../domain/kabkota/kabkota.service';

// Locked sheet name for data upload
export const SHST_DATA_SHEET_NAME = 'SHST Data';

@Injectable()
export class GenerateExcelTemplateUseCase {
    constructor(
        private readonly asbTipeBangunanService: AsbTipeBangunanService,
        private readonly asbKlasifikasiService: AsbKlasifikasiService,
        private readonly kabKotaService: KabKotaService,
    ) {}

    async execute(): Promise<Buffer> {
        // Create workbook
        const workbook = new ExcelJS.Workbook();

        // Fetch data from services (real-time) - no pagination needed, get all
        const [tipeBangunanList, klasifikasiList, kabkotaList] = await Promise.all([
            this.asbTipeBangunanService.findAll({}),
            this.asbKlasifikasiService.findAll({}),
            this.kabKotaService.getKabKotas({}),
        ]);

        // Extract values for dropdowns
        const tipeBangunanValues = tipeBangunanList.data.map(tb => tb.tipe_bangunan);
        const kabkotaValues = kabkotaList.kabkotas.map(kk => kk.nama);

        // Group klasifikasi by tipe bangunan for better validation
        const klasifikasiByTipeBangunan = new Map<number, string[]>();
        tipeBangunanList.data.forEach(tb => {
            const klasifikasis = klasifikasiList.data
                .filter(k => k.id_asb_tipe_bangunan === tb.id)
                .map(k => k.klasifikasi);
            klasifikasiByTipeBangunan.set(tb.id, klasifikasis);
        });

        // Create SOP worksheet
        const sopWorksheet = workbook.addWorksheet('SOP');
        this.createSOPWorksheet(
            sopWorksheet,
            tipeBangunanList.data,
            klasifikasiByTipeBangunan,
            kabkotaValues,
        );

        // Create data upload worksheet with headers
        const dataWorksheet = workbook.addWorksheet(SHST_DATA_SHEET_NAME);
        this.createDataWorksheet(
            dataWorksheet,
            tipeBangunanValues,
            kabkotaValues,
        );

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }

    private createSOPWorksheet(
        worksheet: ExcelJS.Worksheet,
        tipeBangunanList: Array<{ id: number; tipe_bangunan: string }>,
        klasifikasiByTipeBangunan: Map<number, string[]>,
        kabkotaValues: string[],
    ): void {
        const sopData: any[][] = [];

        // Title
        sopData.push(['STANDAR OPERASIONAL PROSEDUR (SOP)']);
        sopData.push(['PENGISIAN TEMPLATE SHST']);
        sopData.push([]);

        // Instructions
        sopData.push(['LANGKAH-LANGKAH PENGISIAN:']);
        sopData.push([]);
        sopData.push(['1. Buka worksheet "SHST Data" untuk mengisi data']);
        sopData.push(['2. Isi data pada baris ke-2 dan seterusnya (baris pertama adalah header)']);
        sopData.push(['3. Gunakan dropdown list yang tersedia untuk kolom: tipe_bangunan, klasifikasi, dan kabkota']);
        sopData.push(['4. Untuk kolom nominal, isi dengan angka positif']);
        sopData.push(['5. Pastikan semua kolom terisi dengan benar sebelum upload']);
        sopData.push(['6. Jangan mengubah nama worksheet "SHST Data"']);
        sopData.push(['7. Jangan menghapus atau mengubah header pada baris pertama']);
        sopData.push([]);

        // Column descriptions
        sopData.push(['DESKRIPSI KOLOM:']);
        sopData.push([]);
        sopData.push(['Kolom', 'Deskripsi', 'Tipe Data', 'Keterangan']);
        sopData.push([
            'tipe_bangunan',
            'Tipe Bangunan',
            'Text (Dropdown)',
            'Pilih dari daftar yang tersedia di bawah',
        ]);
        sopData.push([
            'klasifikasi',
            'Klasifikasi',
            'Text (Dropdown)',
            'Pilih dari daftar yang tersedia di bawah. HARUS sesuai dengan tipe_bangunan yang dipilih!',
        ]);
        sopData.push([
            'kabkota',
            'Kabupaten/Kota',
            'Text (Dropdown)',
            'Pilih dari daftar yang tersedia di bawah',
        ]);
        sopData.push([
            'nominal',
            'Nominal Harga',
            'Number',
            'Angka positif (contoh: 5000000)',
        ]);
        sopData.push([]);

        // Valid values lists
        sopData.push(['DAFTAR NILAI YANG VALID:']);
        sopData.push([]);

        // Tipe Bangunan
        sopData.push(['TIPE BANGUNAN (tipe_bangunan):']);
        sopData.push(['No', 'Nama Tipe Bangunan']);
        tipeBangunanList.forEach((tb, index) => {
            sopData.push([index + 1, tb.tipe_bangunan]);
        });
        sopData.push([]);

        // Klasifikasi (grouped by tipe bangunan)
        sopData.push(['KLASIFIKASI (klasifikasi) - Dikelompokkan berdasarkan Tipe Bangunan:']);
        sopData.push(['PENTING: Klasifikasi yang dipilih HARUS sesuai dengan tipe_bangunan yang dipilih!']);
        sopData.push([]);
        tipeBangunanList.forEach((tb) => {
            const klasifikasis = klasifikasiByTipeBangunan.get(tb.id) || [];
            if (klasifikasis.length > 0) {
                sopData.push([`Tipe Bangunan: ${tb.tipe_bangunan}`]);
                sopData.push(['No', 'Nama Klasifikasi']);
                klasifikasis.forEach((k, index) => {
                    sopData.push([index + 1, k]);
                });
                sopData.push([]);
            }
        });

        // KabKota
        sopData.push(['KABUPATEN/KOTA (kabkota):']);
        sopData.push(['No', 'Nama Kabupaten/Kota']);
        kabkotaValues.forEach((value, index) => {
            sopData.push([index + 1, value]);
        });
        sopData.push([]);

        // Notes
        sopData.push(['CATATAN PENTING:']);
        sopData.push(['- Pastikan nilai yang diinput sesuai dengan daftar di atas']);
        sopData.push(['- Nilai harus ditulis persis seperti yang tertera di daftar']);
        sopData.push(['- PENTING: Klasifikasi yang dipilih HARUS terikat dengan tipe_bangunan yang dipilih']);
        sopData.push(['- Contoh: Jika tipe_bangunan = "Rumah", maka klasifikasi harus salah satu dari klasifikasi yang terikat dengan "Rumah"']);
        sopData.push(['- Untuk nominal, gunakan angka tanpa titik atau koma (contoh: 5000000)']);
        sopData.push(['- Jika data tidak ditemukan di daftar, hubungi administrator']);

        // Add data to worksheet
        sopData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.getRow(rowIndex + 1);
            row.forEach((cellValue, colIndex) => {
                const cell = worksheetRow.getCell(colIndex + 1);
                cell.value = cellValue;
            });
        });

        // Set column widths
        worksheet.getColumn(1).width = 15; // Column A
        worksheet.getColumn(2).width = 40; // Column B
        worksheet.getColumn(3).width = 20; // Column C
        worksheet.getColumn(4).width = 50; // Column D

        // Style title rows
        const titleRow1 = worksheet.getRow(1);
        const titleRow2 = worksheet.getRow(2);
        titleRow1.font = { bold: true, size: 14, color: { argb: 'FF000000' } };
        titleRow1.alignment = { horizontal: 'center', vertical: 'middle' };
        titleRow2.font = { bold: true, size: 14, color: { argb: 'FF000000' } };
        titleRow2.alignment = { horizontal: 'center', vertical: 'middle' };

        // Style section headers
        const sectionStyle = {
            font: { bold: true, size: 12, color: { argb: 'FF000000' } },
            fill: {
                type: 'pattern' as const,
                pattern: 'solid' as const,
                fgColor: { argb: 'FFD9E1F2' }
            },
        };
        const sectionRows = [4, 13, 15]; // Row numbers for section headers
        sectionRows.forEach(rowNum => {
            const cell = worksheet.getCell(rowNum, 1);
            cell.font = sectionStyle.font;
            cell.fill = sectionStyle.fill;
        });

        // Style table headers
        const headerStyle = {
            font: { bold: true, color: { argb: 'FFFFFFFF' } },
            fill: {
                type: 'pattern' as const,
                pattern: 'solid' as const,
                fgColor: { argb: 'FF4472C4' }
            },
            alignment: { horizontal: 'center' as const, vertical: 'middle' as const },
        };
        // Calculate header rows dynamically
        let currentRow = 15 + 2 + tipeBangunanList.length;
        const klasifikasiSectionStart = currentRow;
        tipeBangunanList.forEach((tb) => {
            const klasifikasis = klasifikasiByTipeBangunan.get(tb.id) || [];
            if (klasifikasis.length > 0) {
                currentRow += 3 + klasifikasis.length; // Header + table header + rows
            }
        });
        const headerRows = [13, 15, klasifikasiSectionStart, currentRow];
        headerRows.forEach(rowNum => {
            ['A', 'B'].forEach(col => {
                const cell = worksheet.getCell(`${col}${rowNum}`);
                cell.font = headerStyle.font;
                cell.fill = headerStyle.fill;
                cell.alignment = headerStyle.alignment;
            });
        });
    }

    private createDataWorksheet(
        worksheet: ExcelJS.Worksheet,
        tipeBangunanValues: string[],
        kabkotaValues: string[],
    ): void {
        // Define headers
        const headers = ['tipe_bangunan', 'klasifikasi', 'kabkota', 'nominal'];

        // Add header row
        const headerRow = worksheet.getRow(1);
        headers.forEach((header, index) => {
            const cell = headerRow.getCell(index + 1);
            cell.value = header;
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4472C4' }
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // Set column widths
        worksheet.getColumn(1).width = 25; // tipe_bangunan
        worksheet.getColumn(2).width = 20; // klasifikasi
        worksheet.getColumn(3).width = 25; // kabkota
        worksheet.getColumn(4).width = 18; // nominal
    }
}
