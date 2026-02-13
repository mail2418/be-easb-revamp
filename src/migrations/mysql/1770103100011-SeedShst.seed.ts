import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedShst1770103100011 implements MigrationInterface {
    name = 'SeedShst1770103100011';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const shsts = [
            { tahun: 2024, nominal: 6299000, idAsbTipeBangunan: 2, idAsbKlasifikasi: 4, idKabkota: 62, file: 'ORIGIN' },
            { tahun: 2024, nominal: 6021000, idAsbTipeBangunan: 2, idAsbKlasifikasi: 5, idKabkota: 62, file: 'ORIGIN' },
            { tahun: 2024, nominal: 5681000, idAsbTipeBangunan: 2, idAsbKlasifikasi: 3, idKabkota: 62, file: 'ORIGIN' },
            { tahun: 2024, nominal: 6204000, idAsbTipeBangunan: 1, idAsbKlasifikasi: 1, idKabkota: 62, file: 'ORIGIN' },
            { tahun: 2024, nominal: 6572000, idAsbTipeBangunan: 1, idAsbKlasifikasi: 2, idKabkota: 62, file: 'ORIGIN' },
        ];

        for (const shst of shsts) {
            await queryRunner.query(
                'INSERT IGNORE INTO `shst` (`tahun`, `nominal`, `id_asb_tipe_bangunan`, `id_asb_klasifikasi`, `id_kabkota`, `file`) VALUES (?, ?, ?, ?, ?, ?)',
                [shst.tahun, shst.nominal, shst.idAsbTipeBangunan, shst.idAsbKlasifikasi, shst.idKabkota, shst.file],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete all seeded rekening data
        await queryRunner.query(
            'DELETE FROM `shst` WHERE `tahun` IN (2020, 2024, 2025, 2026)'
        );
    }
}

