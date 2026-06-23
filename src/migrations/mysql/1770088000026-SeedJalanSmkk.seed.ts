import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSmkk1770088000026 implements MigrationInterface {
    name = 'SeedJalanSmkk1770088000026';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Note: In MySQL, table is created directly as smkk_global (not jalan_smkk)
        // because InitialSchema was generated after the rename migration in PostgreSQL
        await queryRunner.query(
            `
            INSERT INTO \`smkk_global\` (\`bulan\`, \`tahun\`, \`persentase_smkk\`)
            SELECT ?, ?, ?
            FROM DUAL
            WHERE NOT EXISTS (
                SELECT 1 FROM \`smkk_global\`
                WHERE \`bulan\` = ? AND \`tahun\` = ?
            )
        `,
            [12, 2025, 0.02, 12, 2025],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DELETE FROM \`smkk_global\`
            WHERE \`bulan\` = ? AND \`tahun\` = ? AND \`persentase_smkk\` = ?
        `,
            [12, 2025, 0.02],
        );
    }
}
