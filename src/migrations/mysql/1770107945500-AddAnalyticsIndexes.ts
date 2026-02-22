import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Add Analytics Indexes for ASB and Usulan Jalan
 * 
 * These indexes are critical for analytics queries and performance optimization.
 * Equivalent to PostgreSQL migrations:
 * - 1767282007259-AddIndexesForAsbAnalytics.ts
 * - 1767283468316-AddIndexesForUsulanJalanAnalytics.ts
 */
export class AddAnalyticsIndexes1770107945500 implements MigrationInterface {
    name = 'AddAnalyticsIndexes1770107945500';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ASB Analytics Indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_asb_created_at\` 
            ON \`asb\` (\`created_at\`)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_asb_tahun_anggaran\` 
            ON \`asb\` (\`tahun_anggaran\`)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_asb_opd_created_at\` 
            ON \`asb\` (\`id_opd\`, \`created_at\`)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_asb_status_tahun\` 
            ON \`asb\` (\`id_asb_status\`, \`tahun_anggaran\`)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_asb_opd_tahun\` 
            ON \`asb\` (\`id_opd\`, \`tahun_anggaran\`)
        `);

        // Usulan Jalan Analytics Indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_usulan_jalan_created_at\` 
            ON \`usulan_jalan\` (\`created_at\`)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_usulan_jalan_tahun_anggaran\` 
            ON \`usulan_jalan\` (\`tahun_anggaran\`)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_usulan_jalan_opd_created_at\` 
            ON \`usulan_jalan\` (\`id_opd\`, \`created_at\`)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_usulan_jalan_status_tahun\` 
            ON \`usulan_jalan\` (\`id_usulan_jalan_status\`, \`tahun_anggaran\`)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS \`idx_usulan_jalan_opd_tahun\` 
            ON \`usulan_jalan\` (\`id_opd\`, \`tahun_anggaran\`)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop Usulan Jalan indexes
        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_usulan_jalan_opd_tahun\` ON \`usulan_jalan\`
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_usulan_jalan_status_tahun\` ON \`usulan_jalan\`
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_usulan_jalan_opd_created_at\` ON \`usulan_jalan\`
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_usulan_jalan_tahun_anggaran\` ON \`usulan_jalan\`
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_usulan_jalan_created_at\` ON \`usulan_jalan\`
        `);

        // Drop ASB indexes
        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_asb_opd_tahun\` ON \`asb\`
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_asb_status_tahun\` ON \`asb\`
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_asb_opd_created_at\` ON \`asb\`
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_asb_tahun_anggaran\` ON \`asb\`
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_asb_created_at\` ON \`asb\`
        `);
    }
}
