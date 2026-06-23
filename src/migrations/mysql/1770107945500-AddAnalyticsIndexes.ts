import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Add Analytics Indexes for ASB and Usulan Jalan
 *
 * Uses information_schema checks because older MySQL does not support
 * CREATE INDEX IF NOT EXISTS / DROP INDEX IF EXISTS.
 *
 * Equivalent intent to PostgreSQL migrations:
 * - 1767282007259-AddIndexesForAsbAnalytics.ts
 * - 1767283468316-AddIndexesForUsulanJalanAnalytics.ts
 */
export class AddAnalyticsIndexes1770107945500 implements MigrationInterface {
    name = 'AddAnalyticsIndexes1770107945500';

    private async indexExists(
        queryRunner: QueryRunner,
        table: string,
        indexName: string,
    ): Promise<boolean> {
        const rows = await queryRunner.query(
            `SELECT 1 AS ok FROM information_schema.statistics
             WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ?
             LIMIT 1`,
            [table, indexName],
        );
        return Array.isArray(rows) && rows.length > 0;
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        const create = async (table: string, indexName: string, columns: string) => {
            if (!(await this.indexExists(queryRunner, table, indexName))) {
                await queryRunner.query(
                    `CREATE INDEX \`${indexName}\` ON \`${table}\` (${columns})`,
                );
            }
        };

        await create('asb', 'idx_asb_created_at', '`created_at`');
        await create('asb', 'idx_asb_tahun_anggaran', '`tahun_anggaran`');
        await create('asb', 'idx_asb_opd_created_at', '`id_opd`, `created_at`');
        await create('asb', 'idx_asb_status_tahun', '`id_asb_status`, `tahun_anggaran`');
        await create('asb', 'idx_asb_opd_tahun', '`id_opd`, `tahun_anggaran`');

        await create('usulan_jalan', 'idx_usulan_jalan_created_at', '`created_at`');
        await create('usulan_jalan', 'idx_usulan_jalan_tahun_anggaran', '`tahun_anggaran`');
        await create('usulan_jalan', 'idx_usulan_jalan_opd_created_at', '`id_opd`, `created_at`');
        await create(
            'usulan_jalan',
            'idx_usulan_jalan_status_tahun',
            '`id_usulan_jalan_status`, `tahun_anggaran`',
        );
        await create('usulan_jalan', 'idx_usulan_jalan_opd_tahun', '`id_opd`, `tahun_anggaran`');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const drop = async (table: string, indexName: string) => {
            if (await this.indexExists(queryRunner, table, indexName)) {
                await queryRunner.query(`DROP INDEX \`${indexName}\` ON \`${table}\``);
            }
        };

        await drop('usulan_jalan', 'idx_usulan_jalan_opd_tahun');
        await drop('usulan_jalan', 'idx_usulan_jalan_status_tahun');
        await drop('usulan_jalan', 'idx_usulan_jalan_opd_created_at');
        await drop('usulan_jalan', 'idx_usulan_jalan_tahun_anggaran');
        await drop('usulan_jalan', 'idx_usulan_jalan_created_at');

        await drop('asb', 'idx_asb_opd_tahun');
        await drop('asb', 'idx_asb_status_tahun');
        await drop('asb', 'idx_asb_opd_created_at');
        await drop('asb', 'idx_asb_tahun_anggaran');
        await drop('asb', 'idx_asb_created_at');
    }
}
