import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { JalanSaluranRuangLingkupService } from '../../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service';

export const HSPK_DATA_SHEET_NAME = 'HSPK Data';

@Injectable()
export class GenerateExcelTemplateUseCase {
    constructor(
        private readonly jalanSaluranRuangLingkupService: JalanSaluranRuangLingkupService,
    ) {}

    async execute(): Promise<Buffer> {
        const workbook = new ExcelJS.Workbook();

        const ruangLingkupResult = await this.jalanSaluranRuangLingkupService.findAll({});
        const ruangLingkupList = ruangLingkupResult.data;

        const sopWorksheet = workbook.addWorksheet('SOP');
        this.createSOPWorksheet(sopWorksheet, ruangLingkupList);

        const dataWorksheet = workbook.addWorksheet(HSPK_DATA_SHEET_NAME);
        this.createDataWorksheet(dataWorksheet);

        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }

    private createSOPWorksheet(
        worksheet: ExcelJS.Worksheet,
        ruangLingkupList: Array<{
            id: number;
            id_jenis_usulan: number;
            deskripsi_ruang_lingkup: string;
            jenisUsulan?: { jenis?: string };
        }>,
    ): void {
        const sopData: unknown[][] = [];

        sopData.push(['STANDAR OPERASIONAL PROSEDUR (SOP)']);
        sopData.push(['PENGISIAN TEMPLATE HSPK']);
        sopData.push([]);

        sopData.push(['LANGKAH-LANGKAH PENGISIAN:']);
        sopData.push([]);
        sopData.push(['1. Buka worksheet "HSPK Data" untuk mengisi data']);
        sopData.push(['2. Isi data pada baris ke-2 dan seterusnya (baris pertama adalah header)']);
        sopData.push(['3. Kolom id_ruang_lingkup diisi dengan ID yang valid (lihat daftar referensi di bawah)']);
        sopData.push(['4. Kolom tahun_anggaran: tahun fiskal per baris (2000–2100)']);
        sopData.push(['5. Kolom satuan: teks bebas (tidak terhubung ke master satuan)']);
        sopData.push(['6. Kolom harga_satuan: angka >= 0']);
        sopData.push(['7. Kolom uraian: opsional, boleh dikosongkan']);
        sopData.push(['8. Jangan mengubah nama worksheet "HSPK Data"']);
        sopData.push(['9. Jangan menghapus atau mengubah header pada baris pertama']);
        sopData.push([]);

        sopData.push(['DESKRIPSI KOLOM:']);
        sopData.push([]);
        sopData.push(['Kolom', 'Deskripsi', 'Tipe Data', 'Keterangan']);
        sopData.push([
            'id_ruang_lingkup',
            'ID Ruang Lingkup',
            'Integer',
            'Foreign key ke jalan_saluran_ruang_lingkup.id (gunakan daftar referensi)',
        ]);
        sopData.push([
            'no_mata_pembayaran',
            'Nomor Mata Pembayaran',
            'Text',
            'Unik bersama tahun_anggaran (constraint database)',
        ]);
        sopData.push(['satuan', 'Satuan', 'Text', 'Misalnya m^1, m2, m3, unit']);
        sopData.push(['harga_satuan', 'Harga Satuan', 'Number', 'Angka >= 0']);
        sopData.push(['uraian', 'Uraian', 'Text', 'Opsional']);
        sopData.push([
            'tahun_anggaran',
            'Tahun Anggaran',
            'Integer',
            'Tahun fiskal per baris (2000–2100), sesuai kolom tahun_anggaran pada tabel hspk',
        ]);
        sopData.push([]);

        sopData.push(['REFERENSI id_ruang_lingkup (ID | deskripsi | jenis usulan):']);
        sopData.push(['id', 'deskripsi_ruang_lingkup', 'jenis_usulan']);
        ruangLingkupList.forEach((rl) => {
            sopData.push([
                rl.id,
                rl.deskripsi_ruang_lingkup,
                rl.jenisUsulan?.jenis ?? '',
            ]);
        });
        sopData.push([]);

        sopData.push(['CATATAN:']);
        sopData.push(['- Unik: (tahun_anggaran, no_mata_pembayaran)']);
        sopData.push(['- Duplikat kombinasi tersebut dalam satu file akan ditolak']);

        sopData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.getRow(rowIndex + 1);
            (row as unknown[]).forEach((cellValue, colIndex) => {
                const cell = worksheetRow.getCell(colIndex + 1);
                cell.value = cellValue as ExcelJS.CellValue;
            });
        });

        worksheet.getColumn(1).width = 22;
        worksheet.getColumn(2).width = 40;
        worksheet.getColumn(3).width = 22;
        worksheet.getColumn(4).width = 36;

        const titleRow1 = worksheet.getRow(1);
        const titleRow2 = worksheet.getRow(2);
        titleRow1.font = { bold: true, size: 14 };
        titleRow1.alignment = { horizontal: 'center', vertical: 'middle' };
        titleRow2.font = { bold: true, size: 14 };
        titleRow2.alignment = { horizontal: 'center', vertical: 'middle' };
    }

    private createDataWorksheet(worksheet: ExcelJS.Worksheet): void {
        const headers = [
            'id_ruang_lingkup',
            'no_mata_pembayaran',
            'satuan',
            'harga_satuan',
            'uraian',
            'tahun_anggaran',
        ];

        const headerRow = worksheet.getRow(1);
        headers.forEach((header, index) => {
            const cell = headerRow.getCell(index + 1);
            cell.value = header;
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4472C4' },
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        worksheet.getColumn(1).width = 18;
        worksheet.getColumn(2).width = 22;
        worksheet.getColumn(3).width = 14;
        worksheet.getColumn(4).width = 16;
        worksheet.getColumn(5).width = 36;
        worksheet.getColumn(6).width = 16;
    }
}
