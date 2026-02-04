import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPpnGlobal1770088000025 implements MigrationInterface {
    name = 'SeedPpnGlobal1770088000025';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // MySQL compatible: INSERT ... SELECT ... WHERE NOT EXISTS
        await queryRunner.query(`
            INSERT INTO \`ppn_global\` (\`bulan\`, \`tahun\`, \`persentase_ppn\`)
            SELECT ?, ?, ?
            FROM DUAL
            WHERE NOT EXISTS (
                SELECT 1 FROM \`ppn_global\`
                WHERE \`bulan\` = ? AND \`tahun\` = ?
            )
        `, [12, 2025, 0.11, 12, 2025]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`ppn_global\`
            WHERE \`bulan\` = ? AND \`tahun\` = ? AND \`persentase_ppn\` = ?
        `, [12, 2025, 0.11]);
    }
}
