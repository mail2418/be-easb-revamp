import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Seeds tipe_saluran: u_ds, dpt_a, dpt_b (idempotent — skips if value already exists).
 */
export class SeedTipeSaluranUsdDpt1770300000013 implements MigrationInterface {
    name = 'SeedTipeSaluranUsdDpt1770300000013';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const values = ['u_ds', 'dpt_a', 'dpt_b'];

        for (const tipe of values) {
            await queryRunner.query(
                `INSERT INTO \`tipe_saluran\` (\`tipe_saluran\`)
                 SELECT ? FROM DUAL
                 WHERE NOT EXISTS (
                     SELECT 1 FROM \`tipe_saluran\` WHERE \`tipe_saluran\` = ? LIMIT 1
                 )`,
                [tipe, tipe],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const values = ['u_ds', 'dpt_a', 'dpt_b'];
        const placeholders = values.map(() => '?').join(', ');
        await queryRunner.query(
            `DELETE FROM \`tipe_saluran\` WHERE \`tipe_saluran\` IN (${placeholders})`,
            values,
        );
    }
}
