import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTahunAnggaranToMainDashboard1770200000007 implements MigrationInterface {
    name = 'AddTahunAnggaranToMainDashboard1770200000007';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add tahun_anggaran column
        await queryRunner.query(`
            ALTER TABLE \`main_dashboard\`
            ADD COLUMN \`tahun_anggaran\` int NULL
        `);

        // Create index for tahun_anggaran
        await queryRunner.query(`
            CREATE INDEX \`idx_main_dashboard_tahun_anggaran\`
            ON \`main_dashboard\` (\`tahun_anggaran\`)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop index
        await queryRunner.query(`
            DROP INDEX \`idx_main_dashboard_tahun_anggaran\` ON \`main_dashboard\`
        `);

        // Drop column
        await queryRunner.query(`
            ALTER TABLE \`main_dashboard\`
            DROP COLUMN \`tahun_anggaran\`
        `);
    }
}
