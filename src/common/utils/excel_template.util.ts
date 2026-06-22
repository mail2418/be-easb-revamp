import { Workbook } from 'exceljs';
import type { Express } from 'express';
import { CreateHspkDto } from '../../presentation/hspk/dto/create_hspk.dto';

const HEADERS = [
    'id_ruang_lingkup',
    'no_mata_pembayaran',
    'satuan',
    'harga_satuan',
    'uraian',
] as const;

export async function buildHspkTemplateBuffer(): Promise<Buffer> {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('HSPK');
    sheet.addRow([...HEADERS]);
    sheet.addRow([1, '1.01.01.01', 'm', 100000, 'Contoh uraian']);
    return Buffer.from(await workbook.xlsx.writeBuffer());
}

export async function parseHspkBulkFile(
    file: Express.Multer.File,
    tahunAnggaran: number = new Date().getFullYear(),
): Promise<CreateHspkDto[]> {
    const workbook = new Workbook();
    await workbook.xlsx.load(file.buffer as any);
    const sheet = workbook.worksheets[0];
    if (!sheet) return [];

    const rows: CreateHspkDto[] = [];
    sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const idRuang = Number(row.getCell(1).value ?? 0);
        const noMata = String(row.getCell(2).value ?? '').trim();
        const satuan = String(row.getCell(3).value ?? '').trim();
        const harga = Number(row.getCell(4).value ?? 0);
        const uraian = String(row.getCell(5).value ?? '').trim();
        if (!idRuang || !noMata) return;
        rows.push({
            id_ruang_lingkup: idRuang,
            no_mata_pembayaran: noMata,
            satuan,
            harga_satuan: harga,
            uraian,
            tahun_anggaran: tahunAnggaran,
        });
    });
    return rows;
}

export async function buildShstTemplateBuffer(): Promise<Buffer> {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('SHST');
    sheet.addRow(['tahun', 'id_asb_tipe_bangunan', 'id_asb_klasifikasi', 'id_kabkota', 'nominal']);
    sheet.addRow([new Date().getFullYear(), 1, 1, 1, 1000000]);
    return Buffer.from(await workbook.xlsx.writeBuffer());
}
