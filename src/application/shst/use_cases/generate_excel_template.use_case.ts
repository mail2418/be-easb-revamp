import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
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
        const workbook = XLSX.utils.book_new();

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
        const sopWorksheet = this.createSOPWorksheet(
            tipeBangunanList.data,
            klasifikasiByTipeBangunan,
            kabkotaValues,
        );

        // Create data upload worksheet with headers
        const dataWorksheet = this.createDataWorksheet(
            tipeBangunanValues,
            kabkotaValues,
        );

        // Add worksheets to workbook (SOP first, then data)
        XLSX.utils.book_append_sheet(workbook, sopWorksheet, 'SOP');
        XLSX.utils.book_append_sheet(workbook, dataWorksheet, SHST_DATA_SHEET_NAME);

        // Generate buffer
        const buffer = XLSX.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx',
            cellStyles: true,
        });

        return buffer;
    }

    private createSOPWorksheet(
        tipeBangunanList: Array<{ id: number; tipe_bangunan: string }>,
        klasifikasiByTipeBangunan: Map<number, string[]>,
        kabkotaValues: string[],
    ): XLSX.WorkSheet {
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

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(sopData);

        // Set column widths
        worksheet['!cols'] = [
            { wch: 15 }, // Column A
            { wch: 40 }, // Column B
            { wch: 20 }, // Column C
            { wch: 50 }, // Column D
        ];

        // Style title rows
        const titleStyle = {
            font: { bold: true, sz: 14, color: { rgb: '000000' } },
            alignment: { horizontal: 'center', vertical: 'center' },
        };
        if (worksheet['A1']) worksheet['A1'].s = titleStyle;
        if (worksheet['A2']) worksheet['A2'].s = titleStyle;

        // Style section headers
        const sectionStyle = {
            font: { bold: true, sz: 12, color: { rgb: '000000' } },
            fill: { fgColor: { rgb: 'D9E1F2' } },
        };
        const sectionRows = [4, 13, 15]; // Row numbers for section headers
        sectionRows.forEach(row => {
            const cell = XLSX.utils.encode_cell({ r: row - 1, c: 0 });
            if (worksheet[cell]) worksheet[cell].s = sectionStyle;
        });

        // Style table headers
        const headerStyle = {
            font: { bold: true, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '4472C4' } },
            alignment: { horizontal: 'center', vertical: 'center' },
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
        headerRows.forEach(row => {
            ['A', 'B'].forEach(col => {
                const cell = col + row;
                if (worksheet[cell]) worksheet[cell].s = headerStyle;
            });
        });

        return worksheet;
    }

    private createDataWorksheet(
        tipeBangunanValues: string[],
        kabkotaValues: string[],
    ): XLSX.WorkSheet {
        // Define headers
        const headers = ['tipe_bangunan', 'klasifikasi', 'kabkota', 'nominal'];

        // Create worksheet data with header only
        const worksheetData = [headers];

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Set column widths
        worksheet['!cols'] = [
            { wch: 25 }, // tipe_bangunan
            { wch: 20 }, // klasifikasi
            { wch: 25 }, // kabkota
            { wch: 18 }, // nominal
        ];

        // Style header row
        const headerStyle = {
            font: { bold: true, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '4472C4' } },
            alignment: { horizontal: 'center', vertical: 'center' },
        };

        const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
            if (!worksheet[cellAddress]) continue;
            worksheet[cellAddress].s = headerStyle;
        }

        // Note: Excel data validation cannot be set directly via xlsx library
        // Users will need to manually set data validation in Excel or we can add instructions
        // For now, we'll add a note in the worksheet
        // The actual validation will be done server-side when parsing

        return worksheet;
    }
}
