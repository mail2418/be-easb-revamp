import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { AsbTipeBangunanService } from '../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.service';
import { AsbKlasifikasiService } from '../../../domain/asb_klasifikasi/asb_klasifikasi.service';
import { AsbJenisService } from '../../../domain/asb_jenis/asb_jenis.service';
import { SatuanService } from '../../../domain/satuan/satuan.service';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

// Locked sheet name for data upload
export const JAKON_DATA_SHEET_NAME = 'Jakon Data';

@Injectable()
export class GenerateExcelTemplateUseCase {
    constructor(
        private readonly asbTipeBangunanService: AsbTipeBangunanService,
        private readonly asbKlasifikasiService: AsbKlasifikasiService,
        private readonly asbJenisService: AsbJenisService,
        private readonly satuanService: SatuanService,
    ) {}

    async execute(): Promise<Buffer> {
        // Create workbook
        const workbook = XLSX.utils.book_new();

        // Fetch data from services (real-time) - no pagination needed, get all
        const [tipeBangunanList, klasifikasiList, jenisList, satuanList] = await Promise.all([
            this.asbTipeBangunanService.findAll({}),
            this.asbKlasifikasiService.findAll({}),
            this.asbJenisService.findAll({}),
            this.satuanService.getSatuans({ page: 1, amount: 10000 }), // Satuan requires page and amount
        ]);

        // Extract values for dropdowns
        const tipeBangunanValues = tipeBangunanList.data.map(tb => tb.tipe_bangunan);
        const jenisValues = jenisList.data.map(j => j.jenis);
        const satuanValues = satuanList.satuans.map(s => s.satuan);
        const typeValues = Object.values(AsbJakonType);

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
            jenisValues,
            satuanValues,
            typeValues,
        );

        // Create data upload worksheet with headers
        const dataWorksheet = this.createDataWorksheet(
            tipeBangunanValues,
            jenisValues,
            satuanValues,
            typeValues,
        );

        // Add worksheets to workbook (SOP first, then data)
        XLSX.utils.book_append_sheet(workbook, sopWorksheet, 'SOP');
        XLSX.utils.book_append_sheet(workbook, dataWorksheet, JAKON_DATA_SHEET_NAME);

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
        jenisValues: string[],
        satuanValues: string[],
        typeValues: string[],
    ): XLSX.WorkSheet {
        const sopData: any[][] = [];

        // Title
        sopData.push(['STANDAR OPERASIONAL PROSEDUR (SOP)']);
        sopData.push(['PENGISIAN TEMPLATE ASB JAKON']);
        sopData.push([]);

        // Instructions
        sopData.push(['LANGKAH-LANGKAH PENGISIAN:']);
        sopData.push([]);
        sopData.push(['1. Buka worksheet "Jakon Data" untuk mengisi data']);
        sopData.push(['2. Isi data pada baris ke-2 dan seterusnya (baris pertama adalah header)']);
        sopData.push(['3. Gunakan dropdown list yang tersedia untuk kolom: tipe_bangunan, jenis usulan asb, klasifikasi, type, dan satuan']);
        sopData.push(['4. Untuk kolom priceFrom, priceTo, dan standard, isi dengan angka positif']);
        sopData.push(['5. Pastikan priceTo >= priceFrom']);
        sopData.push(['6. Pastikan semua kolom terisi dengan benar sebelum upload']);
        sopData.push(['7. Jangan mengubah nama worksheet "Jakon Data"']);
        sopData.push(['8. Jangan menghapus atau mengubah header pada baris pertama']);
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
            'jenis usulan asb',
            'Jenis Usulan ASB',
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
            'type',
            'Type',
            'Text (Dropdown)',
            'Pilih dari: perencanaan, pengawasan, management, pengelolaan',
        ]);
        sopData.push([
            'nama',
            'Nama',
            'Text',
            'Nama jasa konstruksi',
        ]);
        sopData.push([
            'spec',
            'Spesifikasi',
            'Text',
            'Spesifikasi detail',
        ]);
        sopData.push([
            'priceFrom',
            'Harga Dari',
            'Number',
            'Angka positif (contoh: 1000000)',
        ]);
        sopData.push([
            'priceTo',
            'Harga Sampai',
            'Number',
            'Angka positif, harus >= priceFrom (contoh: 5000000)',
        ]);
        sopData.push([
            'satuan',
            'Satuan',
            'Text (Dropdown)',
            'Pilih dari daftar yang tersedia di bawah',
        ]);
        sopData.push([
            'standard',
            'Standard',
            'Number',
            'Angka positif (contoh: 0.15)',
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

        // Jenis Usulan ASB
        sopData.push(['JENIS USULAN ASB (jenis usulan asb):']);
        sopData.push(['No', 'Nama Jenis Usulan ASB']);
        jenisValues.forEach((value, index) => {
            sopData.push([index + 1, value]);
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

        // Type
        sopData.push(['TYPE (type):']);
        sopData.push(['No', 'Nama Type']);
        typeValues.forEach((value, index) => {
            sopData.push([index + 1, value]);
        });
        sopData.push([]);

        // Satuan
        sopData.push(['SATUAN (satuan):']);
        sopData.push(['No', 'Nama Satuan']);
        satuanValues.forEach((value, index) => {
            sopData.push([index + 1, value]);
        });
        sopData.push([]);

        // Notes
        sopData.push(['CATATAN PENTING:']);
        sopData.push(['- Pastikan nilai yang diinput sesuai dengan daftar di atas']);
        sopData.push(['- Nilai harus ditulis persis seperti yang tertera di daftar']);
        sopData.push(['- PENTING: Klasifikasi yang dipilih HARUS terikat dengan tipe_bangunan yang dipilih']);
        sopData.push(['- Contoh: Jika tipe_bangunan = "Rumah", maka klasifikasi harus salah satu dari klasifikasi yang terikat dengan "Rumah"']);
        sopData.push(['- Untuk priceFrom, priceTo, dan standard, gunakan angka tanpa titik atau koma (contoh: 1000000 atau 0.15)']);
        sopData.push(['- Pastikan priceTo >= priceFrom']);
        sopData.push(['- Jika data tidak ditemukan di daftar, hubungi administrator']);

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(sopData);

        // Set column widths
        worksheet['!cols'] = [
            { wch: 20 }, // Column A
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
        // Calculate section rows dynamically
        const sectionRows = [4, 15, 17]; // Row numbers for section headers (LANGKAH-LANGKAH, DESKRIPSI KOLOM, DAFTAR NILAI)
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
        let currentRow = 17 + 2 + tipeBangunanList.length + 2 + jenisValues.length;
        const klasifikasiSectionStart = currentRow;
        tipeBangunanList.forEach((tb) => {
            const klasifikasis = klasifikasiByTipeBangunan.get(tb.id) || [];
            if (klasifikasis.length > 0) {
                currentRow += 3 + klasifikasis.length; // Header + table header + rows
            }
        });
        const typeSectionStart = currentRow;
        const satuanSectionStart = currentRow + 2 + typeValues.length;
        const headerRows = [15, 17 + 2 + tipeBangunanList.length, klasifikasiSectionStart, typeSectionStart, satuanSectionStart];
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
        jenisValues: string[],
        satuanValues: string[],
        typeValues: string[],
    ): XLSX.WorkSheet {
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
            'standard',
        ];

        // Create worksheet data with header only
        const worksheetData = [headers];

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Set column widths
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

        return worksheet;
    }
}
