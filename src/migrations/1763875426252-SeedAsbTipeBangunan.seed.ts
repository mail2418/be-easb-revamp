import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbTipeBangunan1763875426252 implements MigrationInterface {
    name = 'SeedAsbTipeBangunan1763875426252';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const asbTipeBangunans = [
            { tipe_bangunan: 'Gedung Negara' },
            { tipe_bangunan: 'Rumah Negara' },
            { tipe_bangunan: 'Pagar Gedung Negara' },
            { tipe_bangunan: 'Pagar Rumah Negara' },
            { tipe_bangunan: 'Bangunan Non-Standard' }
        ];

        for (const tipeBangunan of asbTipeBangunans) {
            await queryRunner.query(
                `INSERT INTO "asb_tipe_bangunan" ("tipe_bangunan")
                 VALUES ($1)
                 ON CONFLICT ("tipe_bangunan") DO NOTHING`,
                [tipeBangunan.tipe_bangunan],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tipeBangunanList = [
            'Gedung Negara',
            'Rumah Negara',
            'Pagar Gedung Negara',
            'Pagar Rumah Negara',
            'Bangunan Non-Standard'
        ];

        const placeholders = tipeBangunanList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "asb_tipe_bangunan" WHERE "tipe_bangunan" IN (${placeholders})`,
            tipeBangunanList,
        );
    }
}
