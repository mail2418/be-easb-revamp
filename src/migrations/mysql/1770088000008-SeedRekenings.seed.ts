import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRekenings1770088000008 implements MigrationInterface {
    name = 'SeedRekenings1770088000008';

    private readonly rekenings = [
        { rekening_kode: '5', rekening_uraian: 'Belanja Daerah' },
        { rekening_kode: '5.1', rekening_uraian: 'Belanja Operasi' },
        { rekening_kode: '5.1.02', rekening_uraian: 'Belanja Barang dan Jasa' },
        { rekening_kode: '5.1.02.02', rekening_uraian: 'Belanja Jasa' },
        { rekening_kode: '5.1.02.02.08', rekening_uraian: 'Belanja Jasa Konsultansi Konstruksi' },
        { rekening_kode: '5.1.02.02.08.0001', rekening_uraian: 'Belanja Jasa Konsultansi Perencanaan Arsitektur-Jasa Nasihat dan Pra Desain Arsitektural' },
        { rekening_kode: '5.1.02.02.08.0002', rekening_uraian: 'Belanja Jasa Konsultansi Perencanaan Arsitektur-Jasa Desain Arsitektural' },
        { rekening_kode: '5.1.02.03', rekening_uraian: 'Belanja Pemeliharaan' },
        { rekening_kode: '5.1.02.03.03', rekening_uraian: 'Belanja Pemeliharaan Gedung dan Bangunan' },
        { rekening_kode: '5.1.02.03.03.0001', rekening_uraian: 'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Kantor' },
        { rekening_kode: '5.1.02.03.04', rekening_uraian: 'Belanja Pemeliharaan Jalan, Jaringan, dan Irigasi' },
        { rekening_kode: '5.1.02.03.04.0001', rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Nasional' },
        { rekening_kode: '5.2', rekening_uraian: 'Belanja Modal' },
        { rekening_kode: '5.2.03', rekening_uraian: 'Belanja Modal Gedung dan Bangunan' },
        { rekening_kode: '5.2.03.01', rekening_uraian: 'Belanja Modal Bangunan Gedung' },
        { rekening_kode: '5.2.03.01.01', rekening_uraian: 'Belanja Modal Bangunan Gedung Tempat Kerja' },
        { rekening_kode: '5.2.03.01.01.0001', rekening_uraian: 'Belanja Modal Bangunan Gedung Kantor' },
        { rekening_kode: '5.2.04', rekening_uraian: 'Belanja Modal Jalan, Jaringan, dan Irigasi' },
        { rekening_kode: '5.2.04.01', rekening_uraian: 'Belanja Modal Jalan dan Jembatan' },
        { rekening_kode: '5.2.04.01.01', rekening_uraian: 'Belanja Modal Jalan' },
        { rekening_kode: '5.2.04.01.01.0003', rekening_uraian: 'Belanja Modal Jalan Kabupaten' },
        { rekening_kode: '5.1.02.01.01.0039', rekening_uraian: 'Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat' }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const rekening of this.rekenings) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`rekenings\` (\`rekening_kode\`, \`rekening_uraian\`)
                 VALUES (?, ?)`,
                [rekening.rekening_kode, rekening.rekening_uraian],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const kodeList = this.rekenings.map((r) => r.rekening_kode);
        if (!kodeList.length) return;

        const placeholders = kodeList.map(() => '?').join(', ');
        await queryRunner.query(
            `DELETE FROM \`rekenings\` WHERE \`rekening_kode\` IN (${placeholders})`,
            kodeList,
        );
    }
}
