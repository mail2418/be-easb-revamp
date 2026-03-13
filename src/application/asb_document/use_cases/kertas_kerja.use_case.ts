import { Injectable } from '@nestjs/common';
import { KertasKerjaDto } from 'src/presentation/asb_document/dto/kertas_kerja.dto'
import * as puppeteer from 'puppeteer';

@Injectable()
export class KertasKerjaUseCase {
    async execute(data: KertasKerjaDto): Promise<Buffer> {
        const html = await this.generateHtml(data);
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
                top: '70px',
                bottom: '60px',
                left: '15mm',
                right: '15mm'
            },
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="font-size:8px; width:100%; text-align:right; padding-right:20px;">
                </div>
            `,
            footerTemplate: `
                <div style="font-size:8px; width:100%; padding:5px 20px; 
                            color:#555; display:flex; justify-content:space-between;">
                    <span>Dicetak melalui Aplikasi eASB ${new Date().getFullYear()} - Diajukan oleh ${data.dataAsb.opd?.opd} | ${data.usernameOpd} - Disetujui oleh AdPem: ${data.dataAsb.verifikatorAdpem?.username || '-'} pada ${data.dataAsb.verifiedAdpemAt || '-'} | Disetujui oleh BPKAD: ${data.dataAsb.verifikatorBPKAD?.username || '-'} pada ${data.dataAsb.verifiedBpkadAt || '-'} | Disetujui oleh Bappeda: ${data.dataAsb.verifikatorBappeda?.username || '-'} pada ${data.dataAsb.verifiedBappedaAt || '-'}</span>
                    <div style="width:20px;">
                        <span class="pageNumber"></span> / <span class="totalPages"></span>
                    </div>
                </div>
            `
        });

        await browser.close();
        return Buffer.from(pdfBuffer);
    }

    async generateHtml(data: KertasKerjaDto): Promise<string> {
        const { title, tipe_bangunan, tanggal_cetak, dataAsb, dataAsbDetailReview, shst, dataBps, dataBpns } = data;

        // Helper for number formatting
        const number_format = (num: number, decimals = 0) => {
            return Number(num)?.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) || '0';
        };

        // Helper for terbilang (simplified version)
        const terbilang = (nilai: number): string => {
            const angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
            let temp = "";
            if (nilai < 12) {
                temp = " " + angka[nilai];
            } else if (nilai < 20) {
                temp = terbilang(nilai - 10) + " Belas";
            } else if (nilai < 100) {
                temp = terbilang(Math.floor(nilai / 10)) + " Puluh" + terbilang(nilai % 10);
            } else if (nilai < 200) {
                temp = " Seratus" + terbilang(nilai - 100);
            } else if (nilai < 1000) {
                temp = terbilang(Math.floor(nilai / 100)) + " Ratus" + terbilang(nilai % 100);
            } else if (nilai < 2000) {
                temp = " Seribu" + terbilang(nilai - 1000);
            } else if (nilai < 1000000) {
                temp = terbilang(Math.floor(nilai / 1000)) + " Ribu" + terbilang(nilai % 1000);
            } else if (nilai < 1000000000) {
                temp = terbilang(Math.floor(nilai / 1000000)) + " Juta" + terbilang(nilai % 1000000);
            } else if (nilai < 1000000000000) {
                temp = terbilang(Math.floor(nilai / 1000000000)) + " Milyar" + terbilang(nilai % 1000000000);
            }
            return temp;
        };

        // Calculate totals for BPS
        let sumBps = 0;
        let jbobotKoef = 0;
        const bpsRows = dataBps.map((row, i) => {
            const bobot = row.asb.bobot_input ?? 0;
            const jumlahBobot = row.asb.jumlah_bobot ?? 0;
            const rincianHarga = row.asb.rincian_harga ?? 0;

            if (row.asb.jumlah_bobot) jbobotKoef += row.asb.jumlah_bobot;
            if (row.asb.rincian_harga) sumBps += row.asb.rincian_harga;

            return `
                <tr>
                    <td class="text-center">${i + 1}</td>
                    <td>${row.komponen}</td>
                    <td class="text-right">
                        ${bobot} %
                    </td>
                    <td class="text-right">
                        ${row.asb.rincian_harga ? number_format(rincianHarga) : '-'}
                    </td>
                </tr>
            `;
        }).join('');

        // Calculate totals for BPNS
        let sumBpns = 0;
        let jbobotNsKoef = 0;
        const bpnsRows = dataBpns.map((row, i) => {
            const bobot = row.asb.bobot_input ?? 0;
            const jumlahBobot = row.asb.jumlah_bobot ?? 0;
            const rincianHarga = row.asb.rincian_harga ?? 0;

            if (row.asb.jumlah_bobot) jbobotNsKoef += row.asb.jumlah_bobot;
            if (row.asb.rincian_harga) sumBpns += row.asb.rincian_harga;

            return `
                <tr>
                    <td class="text-center">${i + 1}</td>
                    <td>${row.komponen}</td>
                    <td class="text-right">
                        ${bobot} %
                    </td>
                    <td class="text-right">
                        ${row.asb.rincian_harga ? number_format(rincianHarga) : '-'}
                    </td>
                </tr>
            `;
        }).join('');

        const totalBiayaKonstruksi = sumBps + sumBpns;

        // Jakon calculations (using values from dataAsb if available, otherwise 0)
        const jakonPerencanaan = dataAsb.perencanaanKonstruksi ?? 0;
        const jakonPengawasan = dataAsb.pengawasanKonstruksi ?? 0;
        const jakonManagement = dataAsb.managementKonstruksi ?? 0;
        const jakonPengelolaan = dataAsb.pengelolaanKegiatan ?? 0;

        // Helper to safely access nested properties
        const getOpd = (d: any) => d.opd?.opd ?? '';
        const getNama = (d: any) => d.namaAsb ?? ''; // Changed from nama to namaAsb based on entity
        const getKlasifikasi = (d: any) => d.asbKlasifikasi?.klasifikasi ?? '';

        const asbDetailsReview = dataAsbDetailReview.map((detail, i: number) => `
            <tr>
                <td></td>
                <td>- Luas ${detail.asb_lantai?.lantai}</td>
                <td>:</td>
                <td>${detail.luas} m<sup>2</sup></td>
            </tr>
        `).join('');

        const detailFungsiRows = dataAsbDetailReview.map((detail, i: number) => `
            <tr>
                <td></td>
                <td>- Fungsi ${detail.asb_lantai?.lantai}</td>
                <td>:</td>
                <td>${detail.asb_fungsi_ruang.fungsi_ruang} </td>
            </tr>
        `).join('');

        return `
<!DOCTYPE html>
<html>
<head>
  <title>Kertas Kerja - ${getNama(dataAsb)}</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <style>
    /* ==== LAYOUT & PRINT SAFETY ==== */
    * { box-sizing: border-box; }

    @page {
      /* tambahkan ruang bawah untuk agar tidak “menggunting” konten */
      margin: 15mm 12mm 25mm 12mm;
    }

    html, body {
      margin: 0; padding: 0;
      background: #f5f7fb;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10px; color: #333;
      counter-reset: page;
    }

    .report-wrapper {
      padding: 20px 24px 30mm 24px; /* ruang ekstra untuk footer */
      background: #fff;
    }

    /* ==== TIPOGRAFI & HEADER LAPORAN ==== */
    .report-header { margin-bottom: 15px; }
    .report-title { font-size: 18px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; }
    .report-title u { text-decoration-thickness: 1px; }
    .report-meta { font-size: 10px; margin-top: 6px; color: #666; }

    /* ==== TABEL UMUM ==== */
    .table-condensed>thead>tr>th,
    .table-condensed>tbody>tr>th,
    .table-condensed>tfoot>tr>th,
    .table-condensed>thead>tr>td,
    .table-condensed>tbody>tr>td,
    .table-condensed>tfoot>tr>td { padding: 3px 6px; }

    .table {
      width: 100%;
      border-collapse: collapse !important;
      table-layout: fixed;
      margin-bottom: 12px;
      background: #fff;
    }
    .table th, .table td { border: 1px solid #dee2e6; vertical-align: middle; }

    .table-striped tbody tr:nth-of-type(odd)  { background: #f9fbff; }
    .table-striped tbody tr:nth-of-type(even) { background: #fff; }
    .table-hover   tbody tr:hover { background: #eef2ff; }

    /* Header biru tua untuk section utama (I, II, III, IV) */
    .table > thead > tr > th {
      color: #ffffff;
      background: #192841;
      background: linear-gradient(90deg, #192841, #243b64);
      border-color: #192841;
      font-weight: 600;
    }
    .table.section-table > thead > tr > th:first-child { width: 3%; text-align: center; }
    .table.section-table > thead > tr > th:nth-child(2) { text-align: left; }

    /* Header tabel detail (nested) dibuat abu-abu agar kontras jelas, tidak ikut biru */
    .table.det > thead > tr > th {
      color: #212529 !important;
      background: #f3f4f7 !important;
      border-color: #e5e7eb !important;
      font-weight: 600;
    }

    .table.det { margin-bottom: 0; }

    .table-inner-wrapper { padding: 4px 0; }

    .highlight-row { background: #f8fafc; font-weight: 600; }
    .text-right-strong { font-weight: 700; text-align: right; }

    .section-label    { font-weight: 700; }
    .section-subtitle { font-weight: 600; }

    /* ==== PRINT BEHAVIOR (warna, header repeat, avoid split rows) ==== */
    thead { display: table-header-group; }  /* ulangi header bila tabel terpotong halaman */
    tfoot { display: table-footer-group; }

    table, tr, td, th {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    @media print {
      html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; counter-reset: page; }

      /* pastikan teks header tetap putih di atas biru tua */
      .table > thead > tr > th {
        color: #ffffff !important;
        background: #192841 !important;
        border-color: #192841 !important;
      }

      /* dan header nested tetap abu-abu */
      .table.det > thead > tr > th {
        color: #212529 !important;
        background: #f3f4f7 !important;
        border-color: #e5e7eb !important;
      }
    }

    /* Terbilang & catatan */
    .note-text { font-size: 9px; color: #555; }
    .terbilang-label { font-weight: 700; font-size: 10px; }
    .terbilang-text  { font-style: italic; font-size: 10px; }

    .section-divider-row td {
      border: none; text-align: center; padding: 6px 0; color: #999;
    }

    /* === Lebar kolom untuk tabel Analisis (bagian III) === */
    #analisis-biaya td.num, 
    #analisis-biaya th.num {
    width: 16%;
    white-space: nowrap;      /* angka tidak membungkus */
    }

    /* Kolom angka di baris-baris yang rata kanan di tabel III default ke lebar sempit */
    #analisis-biaya tbody tr td.text-right { 
    width: 16%;
    white-space: nowrap;
    }

    /* === Tabel detail (nested) BPS/BPNS — pakai colgroup === */
    .table.det col.no   { width: 7%; }    /* No. lebih ramping */
    .table.det col.pct  { width: 10%; }   /* Bobot/Used lebih ramping */
    .table.det col.amt  { width: 16%; }   /* Jumlah Rincian Harga lebih ramping */
    .table.det col.name { width: auto; }  /* Komponen mengisi sisa ruang */

    /* nomor halaman */
    .pagenum:before { content: counter(page); }
  </style>
</head>

<body>
  <div class="container-fluid report-wrapper">
    <div class="report-header text-center">
      <div class="report-title"><u>${title}</u></div>
      <div class="report-meta text-left">Tanggal Cetak: <span>${tanggal_cetak}</span></div>
    </div>

    <!-- I. DATA GENERAL -->
    <table class="table table-hover table-condensed table-striped section-table">
      <thead>
        <tr>
          <th class="text-center section-label">I.</th>
          <th class="text-left section-subtitle">Data General</th>
          <th class="text-center" style="width:3%;"></th>
          <th class="text-center" style="width:60%;"></th>
        </tr>
      </thead>
      <tbody>
        <tr><td></td><td>Perangkat Daerah</td><td>:</td><td>${getOpd(dataAsb)}</td></tr>
        <tr><td></td><td>Alamat</td><td>:</td><td>${dataAsb.alamat ?? ''}</td></tr>
        <tr><td></td><td>Nama Bangunan</td><td>:</td><td>${getNama(dataAsb)}</td></tr>
        <tr><td></td><td>Tahun Anggaran</td><td>:</td><td>${dataAsb.tahunAnggaran}</td></tr>
        <tr><td></td><td>Jumlah Lantai Tingkat Atas</td><td>:</td><td>${dataAsb.totalLantai}</td></tr>
        ${asbDetailsReview}
        <tr class="highlight-row"><td></td><td>Luas Total Bangunan</td><td>:</td><td>${dataAsb.luasTotalBangunan} m<sup>2</sup></td></tr>
        <tr class="highlight-row"><td></td><td>Koefesien Tingkat Lantai</td><td>:</td><td>${dataAsb.koefisienLantaiTotal}</td></tr>
        <tr class="highlight-row"><td></td><td>Fungsi Bangunan Ruang</td><td>:</td><td></td></tr>
        ${detailFungsiRows}
        <tr><td class="highlight-row"></td><td>Koefesien Fungsi Bangunan</td><td>:</td><td>${dataAsb.koefisienFungsiRuangTotal}</td></tr>
        <tr><td></td><td>Tipe Bangunan</td><td>:</td><td>${tipe_bangunan}</td></tr>
        <tr><td></td><td>Klasifikasi Bangunan</td><td>:</td><td>${getKlasifikasi(dataAsb)}</td></tr>
        <tr><td></td><td>Lokasi Bangunan</td><td>:</td><td>${dataAsb.kabkota?.nama}</td></tr>
      </tbody>
    </table>

    <!-- II. DATA ANALISIS -->
    <table class="table table-hover table-condensed table-striped section-table">
        <colgroup>
        <col style="width: 3%;">   <!-- kolom kosong / III. -->
        <col style="width: 4%;">   <!-- kolom 1., 2., 3. -->
        <col>                      <!-- kolom judul -->
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th class="text-center section-label">II.</th>
          <th class="text-left section-subtitle" colspan="5">Data Analisis</th>
        </tr>
      </thead>
      <tbody>
        <tr><td></td><td class="text-center section-no">1.</td><td colspan="4">Undang Undang Nomor 28 Tahun 2002 tentang Bangunan Gedung</td></tr>
        <tr><td></td><td class="text-center">2.</td><td colspan="4">Peraturan Pemerintah Nomor 16 Tahun 2021 tentang Peraturan Pelaksanaan Undang Nomor 28 Tahun 2002 tentang Bangunan Gedung</td></tr>
        <tr><td></td><td class="text-center">3.</td><td colspan="4">Peraturan Menteri PUPR Nomor 22 Tahun 2018 tentang Pembangunan Bangunan Gedung Negara</td></tr>
        <tr><td></td><td class="text-center">4.</td><td colspan="4">Keputusan Menteri PUPR Nomor 1044/KPTS/M/2018 tentang Koefisien / Faktor Pengali Jumlah Lantai Bangunan Gedung Negara</td></tr>
        <tr><td></td><td class="text-center">5.</td><td colspan="4">Peraturan Kepala Daerah Harga Satuan Pemerintah Provinsi Jawa Timur Tahun Anggaran 2024</td></tr>
      </tbody>
    </table>

    <!-- III. ANALISIS BIAYA KONSTRUKSI FISIK -->
    <table class="table table-hover table-condensed table-striped section-table" id="analisis-biaya">
        <colgroup>
        <col style="width: 3%;">   <!-- kolom kosong / III. -->
        <col style="width: 4%;">   <!-- kolom 1., 2., 3. -->
        <col>                      <!-- kolom judul -->
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th class="text-center section-label">III.</th>
          <th class="text-left section-subtitle" colspan="5">Analisis Biaya Pembangunan Konstruksi Fisik ${tipe_bangunan}</th>
        </tr>
      </thead>
      <tbody>
        <!-- SHST -->
        <tr>
          <td></td>
          <td class="font-weight-bold">1.</td>
          <td class="text-left font-weight-bold" colspan="4">Standar Harga Satuan Tertinggi (SHST)</td>
        </tr>
        <tr>
          <td></td><td></td>
          <td class="text-left" colspan="3">1 m<sup>2</sup> Konstruksi Fisik ${tipe_bangunan} ${getKlasifikasi(dataAsb)} di ${dataAsb.kabkota?.nama}</td>
          <td class="text-right font-weight-bold num">${number_format(dataAsb.shst || 0)}</td>
        </tr>

        <!-- BPS -->
        <tr><td></td><td class="font-weight-bold">2.</td><td class="text-left font-weight-bold" colspan="4">Kebutuhan Biaya Pekerjaan Standar</td></tr>
        <tr>
          <td></td><td></td>
          <td class="text-left" colspan="4">
            <div class="table-inner-wrapper">
              <table class="table det table-condensed">
              <colgroup>
                <col class="no">
                <col class="name">
                <col class="pct">
                <col class="amt">
              </colgroup>
                <thead>
                  <tr>
                    <th class="text-center" style="width:8%">No.</th>
                    <th class="text-center">Komponen Bangunan</th>
                    <th class="text-center" style="width:12%">Bobot</th>
                    <th class="text-center" style="width:22%">Jumlah Rincian Harga</th>
                  </tr>
                </thead>
                <tbody>
                  ${bpsRows}
                  <tr class="highlight-row">
                    <td class="text-right" colspan="3"><i><b>Total Kebutuhan Biaya Standar</b></i></td>
                    <td class="text-right num"><b>${number_format(sumBps)}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr><td></td><td></td><td class="text-left" colspan="4">Biaya Pekerjaan Standar = Bobot (%) x SHST x KLB x KFB x Luas Lantai Bangunan</td></tr>
        <tr><td></td><td></td>
          <td class="text-left" colspan="4">
            Biaya Pekerjaan Standar = ${dataAsb.bobotTotalBps || 0} x ${number_format(shst || 0)} m<sup>2</sup> x ${dataAsb.koefisienLantaiTotal} x ${dataAsb.koefisienFungsiRuangTotal} x ${number_format(dataAsb.luasTotalBangunan || 0)} m<sup>2</sup>
          </td>
        </tr>
        <tr><td></td><td></td><td class="text-left font-weight-bold" colspan="3">Biaya Pekerjaan Standar</td><td class="text-right font-weight-bold">${number_format(sumBps)}</td></tr>

        <!-- BPNS -->
        <tr><td></td><td class="font-weight-bold">3.</td><td class="text-left font-weight-bold" colspan="4">Kebutuhan Biaya Pekerjaan Non Standar</td></tr>
        <tr>
          <td></td><td></td>
          <td class="text-left" colspan="4">
            <div class="table-inner-wrapper">
              <table class="table det table-condensed">
                <colgroup>
                  <col class="no">
                  <col class="name">
                  <col class="pct">
                  <col class="amt">
                </colgroup>
                <thead>
                  <tr>
                    <th class="text-center" style="width:8%">No.</th>
                    <th class="text-center">Komponen Non Standar</th>
                    <th class="text-center" style="width:12%">Used</th>
                    <th class="text-center" style="width:22%">Rincian Harga</th>
                  </tr>
                </thead>
                <tbody>
                  ${bpnsRows}
                  <tr class="highlight-row">
                    <td class="text-right" colspan="3"><i><b>Total Kebutuhan Biaya Non Standar</b></i></td>
                    <td class="text-right"><b>${number_format(sumBpns)}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr><td></td><td></td><td class="text-left" colspan="4">Biaya Pekerjaan Non Standar = Bobot (%) x SHST x KLB x KFB x Luas Lantai Bangunan</td></tr>
        <tr><td></td><td></td>
          <td class="text-left" colspan="4">
            Biaya Pekerjaan Non Standar = ${dataAsb.bobotTotalBpns || 0} x ${number_format(shst || 0)} m<sup>2</sup> x ${dataAsb.koefisienLantaiTotal} x ${dataAsb.koefisienFungsiRuangTotal} x ${dataAsb.luasTotalBangunan || 0} m<sup>2</sup>
          </td>
        </tr>
        <tr><td></td><td></td><td class="text-left font-weight-bold" colspan="3">Biaya Pekerjaan Non Standar</td><td class="text-right font-weight-bold">${number_format(sumBpns)}</td></tr>

        <!-- Rekap -->
        <tr><td></td><td class="font-weight-bold">4.</td>
          <td class="text-left font-weight-bold" colspan="4">Rekapitulasi Biaya Konstruksi Fisik ${tipe_bangunan} ${getKlasifikasi(dataAsb)}</td>
        </tr>
        <tr><td></td><td></td><td class="text-left" colspan="3">- Biaya Pekerjaan Standar</td><td class="text-right">${number_format(sumBps)}</td></tr>
        <tr><td></td><td></td><td class="text-left" colspan="3">- Biaya Pekerjaan Non Standar</td><td class="text-right">${number_format(sumBpns)}</td></tr>
        <tr class="highlight-row"><td></td><td></td>
          <td class="text-left font-weight-bold" colspan="3">- Biaya Konstruksi ${tipe_bangunan} ${getKlasifikasi(dataAsb)}</td>
          <td class="text-right font-weight-bold">${number_format(totalBiayaKonstruksi)}</td>
        </tr>
        <tr><td></td><td></td><td class="text-left" colspan="4"><i>*Bobot Non Standar maks. 150% Bobot Standar</i></td></tr>
      </tbody>
    </table>

    <!-- IV. FINAL -->
    <table class="table table-hover table-condensed table-striped section-table">
        <colgroup>
        <col style="width: 3%;">   <!-- kolom kosong / III. -->
        <col style="width: 4%;">   <!-- kolom 1., 2., 3. -->
        <col>                      <!-- kolom judul -->
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th class="text-center section-label" width="2%">IV.</th>
          <th class="text-left section-subtitle" colspan="5">Analisis Biaya Pembangunan Konstruksi Fisik</th>
        </tr>
      </thead>
      <tbody>
        <tr><td width="2%"></td><td width="2%">a.</td><td class="text-left" width="76%" colspan="3">Biaya Konstruksi ${tipe_bangunan} ${getKlasifikasi(dataAsb)}</td><td class="text-right font-weight-bold" colspan="1">${number_format(totalBiayaKonstruksi)}</td></tr>
        <tr><td></td><td>b.</td><td class="text-left" colspan="3">Biaya Perencanaan Konstruksi</td><td class="text-right font-weight-bold" colspan="1">${number_format(jakonPerencanaan)}</td></tr>
        <tr><td></td><td>c.</td><td class="text-left" colspan="3">Biaya Pengawasan Konstruksi</td><td class="text-right font-weight-bold" colspan="1">${number_format(jakonPengawasan)}</td></tr>
        <tr><td></td><td>d.</td><td class="text-left" colspan="3">Biaya Manajemen Konstruksi</td><td class="text-right font-weight-bold" colspan="1">${number_format(jakonManagement)}</td></tr>
        <tr><td></td><td>e.</td><td class="text-left" colspan="3">Biaya Pengelolaan Kegiatan</td><td class="text-right font-weight-bold" colspan="1">${number_format(jakonPengelolaan)}</td></tr>
        <tr class="highlight-row"><td class="text-right" colspan="5">Total</td><td class="text-right font-weight-bold num">Rp${number_format(dataAsb.rekapitulasiBiayaKonstruksi || 0)}</td></tr>
        <tr><td class="text-right" colspan="5"><i><b>Dibulatkan</b></i></td><td class="text-right font-weight-bold num">Rp${number_format(dataAsb.rekapitulasiBiayaKonstruksiRounded || 0)}</td></tr>
        <tr><td colspan="6" class="terbilang-label"><b>Terbilang:</b></td></tr>
        <tr><td colspan="6" class="terbilang-text">${terbilang(dataAsb.rekapitulasiBiayaKonstruksiRounded || 0)} Rupiah</td></tr>
      </tbody>
    </table>

    <p class="note-text">
      *Nilai perencanaan, pengawasan, dan manajemen konstruksi merupakan harga satuan tertinggi yang digunakan sebagai plafon anggaran, apabila terdapat rekomendasi dari Dinas Pembina,
      yaitu Dinas Pekerjaan Umum Cipta Karya maka SKPD dapat menyesuaikan anggaran menggunakan koefisien dalam SIPD.
    </p>
  </div>
</body>
</html>
        `;
    }
}
