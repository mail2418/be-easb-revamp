import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRekeningsJalan1770103100006 implements MigrationInterface {
    name = 'SeedRekeningsJalan1770103100006';

    private readonly rekenings = [
        { rekening_kode: '5.1.02.03.004.00002', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Provinsi' },
        { rekening_kode: '5.1.02.03.004.00003', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Kabupaten' },
        { rekening_kode: '5.1.02.03.004.00004', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Kota' },
        { rekening_kode: '5.1.02.03.004.00005', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Desa' },
        { rekening_kode: '5.1.02.03.004.00009', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Khusus' },
        { rekening_kode: '5.1.02.03.004.00010', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Lainnya' },
        { rekening_kode: '5.1.02.03.004.00012', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Provinsi' },
        { rekening_kode: '5.1.02.03.004.00013', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Kabupaten' },
        { rekening_kode: '5.1.02.03.004.00014', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Kota' },
        { rekening_kode: '5.1.02.03.004.00015', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Desa' },
        { rekening_kode: '5.1.02.03.004.00023', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan Lainnya' },
        { rekening_kode: '5.2.04.01.001.00002', rekening_uraian: 'Belanja Modal Jalan Provinsi' },
        { rekening_kode: '5.2.04.01.001.00003', rekening_uraian: 'Belanja Modal Jalan Kabupaten' },
        { rekening_kode: '5.2.04.01.001.00004', rekening_uraian: 'Belanja Modal Jalan Kota' },
        { rekening_kode: '5.2.04.01.001.00005', rekening_uraian: 'Belanja Modal Jalan Desa' },
        { rekening_kode: '5.2.04.01.001.00009', rekening_uraian: 'Belanja Modal Jalan Khusus' },
        { rekening_kode: '5.2.04.01.001.00010', rekening_uraian: 'Belanja Modal Jalan Lainnya' },
        { rekening_kode: '5.2.04.01.002.00002', rekening_uraian: 'Belanja Modal Jembatan pada Jalan Provinsi' },
        { rekening_kode: '5.2.04.01.002.00003', rekening_uraian: 'Belanja Modal Jembatan pada Jalan Kabupaten' },
        { rekening_kode: '5.2.04.01.002.00004', rekening_uraian: 'Belanja Modal Jembatan pada Jalan Kota' },
        { rekening_kode: '5.2.04.01.002.00005', rekening_uraian: 'Belanja Modal Jembatan pada Jalan Desa' },
        { rekening_kode: '5.2.04.01.002.00013', rekening_uraian: 'Belanja Modal Jembatan Lainnya' },
        { rekening_kode: '5.1.02.03.004.00024', rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Waduk Irigasi' },
        { rekening_kode: '5.1.02.03.004.00025', rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pengambilan Irigasi' },
        { rekening_kode: '5.1.02.03.004.00026', rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pembawa Irigasi' },
        { rekening_kode: '5.1.02.03.004.00027', rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pembuang Irigasi' },
        { rekening_kode: '5.1.02.03.004.00028', rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pengaman Irigasi' },
        { rekening_kode: '5.1.02.03.004.00029', rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pelengkap Irigasi' },
        { rekening_kode: '5.1.02.03.004.00030', rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Sawah Irigasi' },
        { rekening_kode: '5.1.02.03.004.00031', rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Air Irigasi Lainnya' },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const rekening of this.rekenings) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`rekenings\` (\`rekening_kode\`, \`rekening_uraian\`, \`bulan\`, \`tahun\`) VALUES (?, ?, 1, 2024)`,
                [rekening.rekening_kode, rekening.rekening_uraian],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const kodeList = this.rekenings.map((r) => r.rekening_kode);
        const placeholders = kodeList.map(() => '?').join(', ');
        await queryRunner.query(
            `DELETE FROM \`rekenings\` WHERE \`rekening_kode\` IN (${placeholders})`,
            kodeList,
        );
    }
}
