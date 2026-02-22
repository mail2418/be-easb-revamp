import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbTipeBangunan1770088000011 implements MigrationInterface {
    name = 'SeedAsbTipeBangunan1770088000011';

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
                `INSERT IGNORE INTO \`asb_tipe_bangunan\` (\`tipe_bangunan\`)
                 VALUES (?)`,
                [tipeBangunan.tipe_bangunan],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`asb_tipe_bangunan\` WHERE \`tipe_bangunan\` IN ('Gedung Negara', 'Rumah Negara', 'Pagar Gedung Negara', 'Pagar Rumah Negara', 'Bangunan Non-Standard')`
        );
    }
}
