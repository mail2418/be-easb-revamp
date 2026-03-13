import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { SuratPermohonanDto } from 'src/presentation/asb_document/dto/surat_permohonan,dto';

@Injectable()
export class SuratPermohonanUseCase {
    async execute(data: SuratPermohonanDto): Promise<Buffer> {
        const now = new Date();

        const date = new Intl.DateTimeFormat('en-GB').format(now); // DD/MM/YYYY
        const time = now.toTimeString().split(' ')[0].replace(/:/g, ':'); // HH:mm:ss
        const dateFormatted = `${date.replace(/\//g, '-')} ${time}`;

        const html = await this.generateHtml(data, dateFormatted);
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set content and wait for network idle to ensure styles are loaded
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Generate PDF
        // Format A4, print background to keep colors
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '10mm',
                bottom: '10mm',
                left: '10mm',
                right: '10mm'
            }
        });

        await browser.close();
        return Buffer.from(pdfBuffer);
    }

    async generateHtml(data: SuratPermohonanDto, dateFormatted: string): Promise<string> {
        return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Permohonan ASB</title>
    <style>
        @page {
            margin: 2.5cm;
        }

        body {
            font-family: "Times New Roman", serif;
            font-size: 12pt;
            color: #000;
            margin: 0;
        }

        .page {
            width: 100%;
        }

        .title {
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 10px;
            margin-bottom: 25px;
        }

        .address {
            line-height: 1.5;
            margin-bottom: 20px;
        }

        .content {
            line-height: 1.5;
            margin-bottom: 15px;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .data-table td {
            padding: 3px 0;
            vertical-align: top;
        }

        .data-table .col-no {
            width: 4%;
        }

        .data-table .col-label {
            width: 25%;
        }

        .data-table .col-colon {
            width: 2%;
        }

        .data-table .col-value {
            width: 69%;
        }

        .jenis-options span.box {
            display: inline-block;
            border: 1px solid #000;
            padding: 2px 10px;
            margin-right: 8px;
        }

        .closing {
            margin-top: 5px;
            margin-bottom: 40px;
        }

        .signature-box {
            width: 100%;
            border: 1px solid #000;
            border-collapse: collapse;
        }

        .signature-box td {
            padding: 8px 10px;
            border-top: 1px solid #000;
        }

        .signature-box tr:first-child td {
            border-top: none;
        }
    </style>
</head>
<body>
<div class="page">

    <div class="title">SURAT PERMOHONAN</div>

    <div class="address">
        Kepada Yth. Sdr. Ketua Tim Anggaran Pemerintah Daerah (TAPD)<br>
        Kabupaten Tulungagung<br>
        Cq.<br>
        Kepala Bagian Administrasi Pembangunan<br>
        Sekretariat Daerah Kabupaten Tulungagung
    </div>

    <div class="content">
        Bersama ini kami mengajukan usulan kegiatan agar dapatnya dilakukan verifikasi kesesuaian
        dengan Analisis Standar Belanja (ASB) Fisik, dengan data sebagai berikut :
    </div>

    <table class="data-table">
        <tr>
            <td class="col-no">1.</td>
            <td class="col-label">OPD</td>
            <td class="col-colon">:</td>
            <td class="col-value">${data.opd}</td>
        </tr>
        <tr>
            <td class="col-no">2.</td>
            <td class="col-label">Nama Kegiatan</td>
            <td class="col-colon">:</td>
            <td class="col-value">${data.nama_asb}</td>
        </tr>
        <tr>
            <td class="col-no">3.</td>
            <td class="col-label">Jenis Kegiatan</td>
            <td class="col-colon">:</td>
            <td class="col-value">${data.asb_jenis}</td>
        </tr>
        <tr>
            <td class="col-no">4.</td>
            <td class="col-label">Lokasi</td>
            <td class="col-colon">:</td>
            <td class="col-value">${data.alamat}</td>
        </tr>
    </table>

    <div class="closing">
        Demikian usulan ini, atas perhatiannya disampaikan terimakasih.
    </div>

    <table class="signature-box">
        <tr>
            <td style="width:20%;">Diusulkan oleh</td>
            <td style="width:2%;">:</td>
            <td>${data.username}</td>
        </tr>
        <tr>
            <td>Pada tanggal</td>
            <td>:</td>
            <td>${dateFormatted}</td>
        </tr>
    </table>

</div>
</body>
</html>
        `;
    }
}
