import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbFungsiRuang1763661077843 implements MigrationInterface {
    name = 'SeedAsbFungsiRuang1763661077843';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const asbFungsiRuangs = [
            { nama_fungsi_ruang: 'Sidang', koef: 1.5 },
            { nama_fungsi_ruang: 'Operasi', koef: 1.5 },
            { nama_fungsi_ruang: 'ICU', koef: 2.0 },
            { nama_fungsi_ruang: 'ICCU', koef: 2.0 },
            { nama_fungsi_ruang: 'IGD', koef: 2.0 },
            { nama_fungsi_ruang: 'CMU', koef: 2.0 },
            { nama_fungsi_ruang: 'NICU', koef: 2.0 },
            { nama_fungsi_ruang: 'Radiologi', koef: 1.25 },
            { nama_fungsi_ruang: 'Rawat Inap', koef: 1.1 },
            { nama_fungsi_ruang: 'Kantor', koef: 1.0 },
            { nama_fungsi_ruang: 'Selasar Luar Beratap atau Teras', koef: 0.5 },
            { nama_fungsi_ruang: 'Bengkel', koef: 1.0 },
            { nama_fungsi_ruang: 'Dapur dan Laundry', koef: 1.1 },
            { nama_fungsi_ruang: 'Power House', koef: 1.25 },
            { nama_fungsi_ruang: 'Kebidanan', koef: 1.2 },
            { nama_fungsi_ruang: 'Laboratorium', koef: 1.1 },
        ];

        for (const fungsiRuang of asbFungsiRuangs) {
            await queryRunner.query(
                `INSERT INTO "asb_fungsi_ruangs" ("nama_fungsi_ruang", "koef", "is_active")
                 VALUES ($1, $2, $3)
                 ON CONFLICT ("nama_fungsi_ruang") DO NOTHING`,
                [fungsiRuang.nama_fungsi_ruang, fungsiRuang.koef, true],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const fungsiRuangList = [
            'Sidang',
            'Operasi',
            'ICU',
            'ICCU',
            'IGD',
            'CMU',
            'NICU',
            'Radiologi',
            'Rawat Inap',
            'Kantor',
            'Selasar Luar Beratap atau Teras',
            'Bengkel',
            'Dapur dan Laundry',
            'Power House',
            'Kebidanan',
            'Laboratorium',
        ];

        const placeholders = fungsiRuangList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "asb_fungsi_ruangs" WHERE "nama_fungsi_ruang" IN (${placeholders})`,
            fungsiRuangList,
        );
    }
}
