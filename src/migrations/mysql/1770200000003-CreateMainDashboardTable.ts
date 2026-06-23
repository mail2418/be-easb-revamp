import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMainDashboardTable1770200000003 implements MigrationInterface {
    name = 'CreateMainDashboardTable1770200000003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`main_dashboard\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_usulan\` int NOT NULL,
                \`id_jenis_usulan\` int NOT NULL,
                \`id_asb_status\` int NOT NULL,
                \`nama_usulan\` text NOT NULL,
                \`reject_info\` text NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_main_dashboard_id_usulan\` ON \`main_dashboard\` (\`id_usulan\`)
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_main_dashboard_id_jenis_usulan\` ON \`main_dashboard\` (\`id_jenis_usulan\`)
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_main_dashboard_id_asb_status\` ON \`main_dashboard\` (\`id_asb_status\`)
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_main_dashboard_created_at\` ON \`main_dashboard\` (\`created_at\`)
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_main_dashboard_nama_usulan\` ON \`main_dashboard\` (\`nama_usulan\`(255))
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`idx_main_dashboard_nama_usulan\` ON \`main_dashboard\``,
        );
        await queryRunner.query(
            `DROP INDEX \`idx_main_dashboard_created_at\` ON \`main_dashboard\``,
        );
        await queryRunner.query(
            `DROP INDEX \`idx_main_dashboard_id_asb_status\` ON \`main_dashboard\``,
        );
        await queryRunner.query(
            `DROP INDEX \`idx_main_dashboard_id_jenis_usulan\` ON \`main_dashboard\``,
        );
        await queryRunner.query(
            `DROP INDEX \`idx_main_dashboard_id_usulan\` ON \`main_dashboard\``,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS \`main_dashboard\``);
    }
}
