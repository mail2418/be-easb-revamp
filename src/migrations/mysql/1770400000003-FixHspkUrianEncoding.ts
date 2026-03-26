import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Fixes mojibake (UTF-8 mis-decoded as Latin-1) in hspk.uraian for rows that
 * were inserted by the original SeedHspk migration with corrupted encoding.
 * Safe to run on databases that already have correct data — WHERE clauses match
 * only the corrupted strings, so correct rows are left untouched.
 */
export class FixHspkUrianEncoding1770400000003 implements MigrationInterface {
    name = 'FixHspkUrianEncoding1770400000003';

    private readonly fixes: Array<{ no_mata_pembayaran: string; correct_uraian: string }> = [
        { no_mata_pembayaran: '3.4.(2)', correct_uraian: 'Pemotongan Pohon Pilihan diameter 15 \u2013 30 cm' },
        { no_mata_pembayaran: '3.4.(3)', correct_uraian: 'Pemotongan Pohon Pilihan diameter > 30 \u2013 50 cm' },
        { no_mata_pembayaran: '3.4.(4)', correct_uraian: 'Pemotongan Pohon Pilihan diameter > 50 \u2013 75 cm' },
        { no_mata_pembayaran: '7.1 (1)', correct_uraian: 'Beton struktur, fc\u201950 MPa' },
        { no_mata_pembayaran: '7.1 (2)', correct_uraian: 'Beton struktur, fc\u201945 MPa' },
        { no_mata_pembayaran: '7.1 (3) ', correct_uraian: 'Beton struktur, fc\u201940 MPa ' },
        { no_mata_pembayaran: '7.1 (4)', correct_uraian: 'Beton struktur, fc\u201935 MPa' },
        { no_mata_pembayaran: '7.1 (5a)', correct_uraian: 'Beton struktur, fc\u201930 MPa' },
        { no_mata_pembayaran: '7.1 (6a)', correct_uraian: 'Beton struktur, fc\u201925 Mpa' },
        { no_mata_pembayaran: '7.1 (6b)', correct_uraian: 'Beton struktur bervolume besar, fc\u201925 Mpa' },
        { no_mata_pembayaran: '7.1 (6c)', correct_uraian: 'Beton struktur memadat sendiri, fc\u201925 Mpa' },
        { no_mata_pembayaran: '7.1 (7a)', correct_uraian: 'Beton strukur, fc\u201920 MPa ' },
        { no_mata_pembayaran: '7.1 (7b)', correct_uraian: 'Beton strukur bervolume besar, fc\u201920 MPa ' },
        { no_mata_pembayaran: '7.1 (7c)', correct_uraian: 'Beton strukur memadat sendiri, fc\u201920 MPa ' },
        { no_mata_pembayaran: '7.1 (7d)', correct_uraian: 'Beton strukur, fc\u201920 MPa yang dilaksanakan di air' },
        { no_mata_pembayaran: '7.1 (8)', correct_uraian: 'Beton , fc\u201915 Mpa' },
        { no_mata_pembayaran: '7.1 (9)', correct_uraian: 'Beton Siklop, fc\u201915 Mpa' },
        { no_mata_pembayaran: '7.1 (10)', correct_uraian: 'Beton, fc\u201910 Mpa' },
        { no_mata_pembayaran: '7.2 (1c)', correct_uraian: 'Penyediaan Unit Pracetak Gelagar Tipe I Bentang \u2026 meter' },
        { no_mata_pembayaran: '7.2 (2c)', correct_uraian: 'Pemasangan Unit Pracetak Gelagar Tipe I Bentang \u2026 meter' },
        { no_mata_pembayaran: '7.2 (3b)', correct_uraian: 'Penyediaan Unit Pracetak Gelagar Tipe U Bentang \u2026 meter' },
        { no_mata_pembayaran: '7.2 (4b)', correct_uraian: 'Pemasangan Unit Pracetak Gelagar Tipe U Bentang \u2026 meter' },
        { no_mata_pembayaran: '7.2.(5)', correct_uraian: 'Penyediaan Unit Pracetak Gelagar Box bentang ... meter lebar \u2026\u2026meter' },
        { no_mata_pembayaran: '7.2.(6)', correct_uraian: 'Pemasangan Unit Pracetak Gelagar Box bentang ... meter lebar \u2026\u2026meter' },
        { no_mata_pembayaran: '7.2.(8)', correct_uraian: 'Penyediaan Pelat Berongga (Voided Slab) Pracetak bentang \u2026.. Meter (5 meter) ' },
        { no_mata_pembayaran: '7.2.(9)', correct_uraian: 'Pemasangan Pelat Berongga (Voided Slab) Pracetak bentang \u2026.. Meter' },
        { no_mata_pembayaran: '7.4 (3)', correct_uraian: 'Penyediaan Struktur Jembatan Rangka Baja Standar \u2026\u2026 m' },
        { no_mata_pembayaran: '7.4 (4)', correct_uraian: 'Pemasangan Jembatan Rangka Baja Standar Panjang \u2026.. M' },
        { no_mata_pembayaran: '7.5.(1) Custom', correct_uraian: 'Tiang Bor Sekan primer diameter 30 cm (fc\' \u2265 15 MPa)' },
        { no_mata_pembayaran: '7.5.(2) Custom', correct_uraian: 'Tiang Bor Sekan primer diameter 30 cm (fc\' \u2265 15 MPa)' },
        { no_mata_pembayaran: '7.5.(9)', correct_uraian: 'Tiang bor sekan primer diameter \u2026\u2026 cm (fc\' > 15 MPa)' },
        { no_mata_pembayaran: '7.5.(10)', correct_uraian: 'Tiang bor sekan sekunder diameter \u2026..  cm (fc\' > 30 MPa)' },
        { no_mata_pembayaran: '7.6.(6)', correct_uraian: 'Penyediaan Tiang Pancang Kayu Tanpa Pengawetan Ukuran\u2026\u2026 mm' },
        { no_mata_pembayaran: '7.6.(7)', correct_uraian: 'Penyediaan Tiang Pancang Kayu Dengan Pengawetan Ukuran\u2026\u2026 mm' },
        { no_mata_pembayaran: '7.6 (8b)', correct_uraian: 'Penyediaan Tiang Pancang Baja Diameter \u2026. mm tebal \u2026... mm' },
        { no_mata_pembayaran: '7.6.(8c)', correct_uraian: 'Penyediaan Tiang Pancang Baja Diameter \u2026... mm tebal \u2026\u2026 mm' },
        { no_mata_pembayaran: '7.6.(9b)', correct_uraian: 'Penyediaan Tiang Pancang Baja H Beam Ukuran \u2026..mm x \u2026\u2026.. mm x \u2026\u2026.mm x \u2026\u2026... mm' },
        { no_mata_pembayaran: '7.6.(10b)', correct_uraian: 'Penyediaan Tiang Pancang Beton Bertulang Pracetak ukuran \u2026\u2026..mm x \u2026\u2026... mm' },
        { no_mata_pembayaran: '7.6.(11b)', correct_uraian: 'Penyediaan Tiang Pancang Beton Pratekan Pracetak ukuran \u2026\u2026. mm x \u2026\u2026\u2026.  mm' },
        { no_mata_pembayaran: '7.6.(12b)', correct_uraian: 'Penyediaan Tiang Pancang Beton Pratekan Pracetak diameter \u2026\u2026...mm' },
        { no_mata_pembayaran: '7.6.(13)', correct_uraian: 'Pemancangan Tiang Pancang Kayu Ukuran \u2026.. Mm' },
        { no_mata_pembayaran: '7.6.(14b)', correct_uraian: 'Pemancangan Tiang Pancang Baja Diameter \u2026\u2026.. mm ' },
        { no_mata_pembayaran: '7.6.(15b)', correct_uraian: 'Pemancangan Tiang Pancang Baja H beam Ukuran\u2026\u2026.. mm x \u2026\u2026.. mm x \u2026\u2026.. mm x \u2026\u2026... mm' },
        { no_mata_pembayaran: '7.6.(16b)', correct_uraian: 'Pemancangan Tiang Pancang Beton Bertulang Pracetak ukuran\u2026\u2026\u2026. mm x \u2026\u2026\u2026... mm ' },
        { no_mata_pembayaran: '7.6.(17b)', correct_uraian: 'Pemancangan Tiang Pancang Beton Pratekan Pracetak ukuran \u2026\u2026\u2026. mm x \u2026.. mm' },
        { no_mata_pembayaran: '7.6.(18b)', correct_uraian: 'Pemancangan Tiang Pancang Beton Pratekan Pracetak diameter \u2026.. mm' },
        { no_mata_pembayaran: '7.6.(19b)', correct_uraian: 'Tiang Bor Beton, diameter \u2026.. mm' },
        { no_mata_pembayaran: '7.6 (26a)', correct_uraian: 'Pengujian Pembebanan Statis pada Tiang ukuran / diameter \u2026\u2026. meja beban statis Cara beban Siklik' },
        { no_mata_pembayaran: '7.6 (26b)', correct_uraian: 'Pengujian Pembebanan Statis pada Tiang ukuran / diameter \u2026\u2026. meja beban statis Cara beban Bertahap' },
        { no_mata_pembayaran: '7.6.(24)', correct_uraian: 'Tiang Uji jenis \u2026. Ukuran \u2026\u2026' },
        { no_mata_pembayaran: '7.7.(1)', correct_uraian: 'Dinding Sumuran Silinder terpasang, Diameter \u2026\u2026\u2026\u2026\u2026.' },
        { no_mata_pembayaran: '7.11.(5)', correct_uraian: 'Sambungan Siar Muai Expansion Joint Tipe Modular, lebar \u2026\u2026..' },
        { no_mata_pembayaran: '7.11.(6)', correct_uraian: 'Sambungan Siar Muai Expansion Joint Tipe Finger Plate, lebar \u2026\u2026..' },
        { no_mata_pembayaran: '7.11.(7)', correct_uraian: 'Sambungan Siar Muai Expansion Tipe Karet dengan Lebar Celah \u2026\u2026.. Cm' },
        { no_mata_pembayaran: '7.11.(9)', correct_uraian: 'Sambungan Siar Muai Tipe Modular, Lebar \u2026\u2026..' },
        { no_mata_pembayaran: '7.12.(1c)', correct_uraian: 'Landasan Logam Tipe \u2026\u2026.' },
        { no_mata_pembayaran: '7.12.(2)', correct_uraian: 'Landasan Elastomerik Karet Alam Berlapis Baja Ukuran \u2026.. Mm x \u2026.. Mm x\u2026\u2026.. Mm' },
        { no_mata_pembayaran: '7.12.(3)', correct_uraian: 'Landasan Elastomerik Karet Sintetis Berlapis Baja Ukuran \u2026.. Mm x \u2026.. Mm x\u2026\u2026.. Mm' },
        { no_mata_pembayaran: '8.3.(1a)', correct_uraian: 'Pengecetan protektif pada elemen struktur beton, tebal 200\u00b5m' },
        { no_mata_pembayaran: '8.3.(1b)', correct_uraian: 'Pengecetan protektif pada elemen struktur beton, tebal : \u2026\u2026\u00b5m' },
        { no_mata_pembayaran: '8.3.(2a)', correct_uraian: 'Pengecetan dekoratif pada elemen struktur beton, tebal : 100 \u00b5m' },
        { no_mata_pembayaran: '8.3.(2b)', correct_uraian: 'Pengecetan dekoratif pada elemen struktur beton, tebal : \u2026.. \u00b5m' },
        { no_mata_pembayaran: '8.4.(8)', correct_uraian: 'Perkuatan external stressing jembatan beton bentang \u2026\u2026 m' },
        { no_mata_pembayaran: '8.5.(1c)', correct_uraian: 'Penggantian Baut Mutu Tinggi A325 Tipe 1 diameter \u2026\u2026 mm' },
        { no_mata_pembayaran: '8.5.(2c)', correct_uraian: 'Penggantian Baut Mutu Tinggi A490 Tipe 1 diameter \u2026\u2026 mm' },
        { no_mata_pembayaran: '8.5.(3b)', correct_uraian: 'Penggantian Baut Biasa Grade A diameter \u2026\u2026. mm' },
        { no_mata_pembayaran: '8.5.(4b)', correct_uraian: 'Penggantian Baut Biasa Grade B diameter \u2026\u2026.. Mm' },
        { no_mata_pembayaran: '8.5.(5b)', correct_uraian: 'Penggantian Baut Biasa Grade C untuk anchor bolts diameter \u2026\u2026. Mm' },
        { no_mata_pembayaran: '8.5.(6b)', correct_uraian: 'Pengencangan Baut Biasa Grade A diameter \u2026\u2026 mm' },
        { no_mata_pembayaran: '8.5.(7b)', correct_uraian: 'Pengencangan Baut Biasa Grade B diameter \u2026\u2026. mm' },
        { no_mata_pembayaran: '8.6.(1b)', correct_uraian: 'Pengelasan SMAW pada baja Grade \u2026..' },
        { no_mata_pembayaran: '8.6.(2b)', correct_uraian: 'Pengelasan SAW pada baja Grade \u2026\u2026' },
        { no_mata_pembayaran: '8.6.(3b)', correct_uraian: 'Pengelasan GMAW pada baja Grade \u2026..' },
        { no_mata_pembayaran: '8.6.(4b)', correct_uraian: 'Pengelasan FCAW pada baja Grade \u2026\u2026' },
        { no_mata_pembayaran: '8.7.(1c)', correct_uraian: 'Pengecatan struktur baja pada daerah kering tebal \u2026\u2026  mikron' },
        { no_mata_pembayaran: '8.7.(2c)', correct_uraian: 'Pengecatan struktur baja pada daerah basah/pasang surut \u2026.. mikron' },
        { no_mata_pembayaran: '8.7.(3c)', correct_uraian: 'Pengecatan pada elemen sandaran dan/atau pagar pengaman (gruard rail) \u2026.. mikron' },
        { no_mata_pembayaran: '8.8.(5)', correct_uraian: 'Penggantian Elemen Struktur Baja Grade \u2026\u2026..' },
        { no_mata_pembayaran: '8.9.(1)', correct_uraian: 'Pekuatan dengan external stressing untuk jembatan baja dengan bentang \u2026\u2026\u2026.m' },
        { no_mata_pembayaran: '8.11.(5)', correct_uraian: 'Penggantian Sambungan Siar Muai Tipe Modular, lebar \u2026\u2026..' },
        { no_mata_pembayaran: '8.11.(6)', correct_uraian: 'Penggantian Sambungan Siar Muai Tipe Finger Plate, lebar \u2026\u2026..' },
        { no_mata_pembayaran: '8.12.(1)', correct_uraian: 'Penggantian Landasan Logam Tipe \u2026\u2026' },
        { no_mata_pembayaran: '8.12.(2)', correct_uraian: 'Penggantian Landasan Elastomer Karet Alam Berlapis Baja Ukuruan \u2026. mm x \u2026\u2026 mm x \u2026\u2026. mm' },
        { no_mata_pembayaran: '8.12.(3)', correct_uraian: 'Penggantian Landasan Elastomer Sintetis Berlapis Baja Ukuran \u2026.. mm x \u2026.. mm x \u2026\u2026.. mm' },
        { no_mata_pembayaran: '8.12.(4)', correct_uraian: 'Penggantian Landasan Karet Strip tebal \u2026. mm' },
        { no_mata_pembayaran: '8.14.(2)', correct_uraian: 'Penggantian Pipa Penyalur, Pipa Cucuran PVC diamter \u2026\u2026 mm' },
        { no_mata_pembayaran: '8.14.(3)', correct_uraian: 'Penggantian Pipa Penyalur, Pipa Cucuran Baja diamter \u2026\u2026 mm' },
        { no_mata_pembayaran: '9.2.(23)', correct_uraian: 'Semak / Perdu\u2026\u2026\u2026\u2026\u2026\u2026\u2026.' },
        { no_mata_pembayaran: '9.2.(24)', correct_uraian: 'Pohon Jenis \u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026.' },
        { no_mata_pembayaran: '10.2.(1)', correct_uraian: 'Pemeliharaan Jembatan \u2026\u2026 bentang \u2026.. m' },
        { no_mata_pembayaran: '10.2.(2)', correct_uraian: 'Pemeliharaan Jembatan \u2026\u2026 bentang \u2026.. m' },
        { no_mata_pembayaran: '10.2.(3)', correct_uraian: 'Pemeliharaan Jembatan \u2026\u2026 bentang \u2026.. m' },
        { no_mata_pembayaran: '10.2.(4)', correct_uraian: 'Pemeliharaan Jembatan \u2026\u2026 bentang \u2026.. m' },
        { no_mata_pembayaran: '10.2. (\u2026..)', correct_uraian: 'Pemeliharaan Jembatan \u2026\u2026 bentang \u2026.. m' },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const fix of this.fixes) {
            await queryRunner.query(
                `UPDATE \`hspk\` SET \`uraian\` = ? WHERE \`no_mata_pembayaran\` = ? AND \`uraian\` != ?`,
                [fix.correct_uraian, fix.no_mata_pembayaran, fix.correct_uraian],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // No rollback for encoding fixes — the corrected strings are the intended values.
    }
}
