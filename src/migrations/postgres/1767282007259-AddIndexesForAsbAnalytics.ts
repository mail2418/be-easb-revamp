import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexesForAsbAnalytics1767282007259 implements MigrationInterface {
    name = 'AddIndexesForAsbAnalytics1767282007259';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ✅ Index untuk created_at (sangat penting untuk query analytics)
        // Digunakan di: getAllByMonthYear, getAsbStatusCountsByMonthYear, getAsbAnalytics
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_created_at" 
            ON "asb" ("created_at")
        `);

        // ✅ Index untuk tahun_anggaran (sering digunakan di filter)
        // Digunakan di: findAll, getAsbAnalytics
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_tahun_anggaran" 
            ON "asb" ("tahun_anggaran")
        `);

        // ✅ Composite index untuk query analytics dengan filter OPD + created_at
        // Digunakan di: getAllByMonthYear, getAsbStatusCountsByMonthYear, getAsbAnalytics
        // Optimisasi untuk query yang filter berdasarkan OPD dan tanggal
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_opd_created_at" 
            ON "asb" ("id_opd", "created_at")
        `);

        // ✅ Composite index untuk filter status + tahun_anggaran
        // Digunakan di: getAsbAnalytics (untuk grouping by status dengan filter tahun)
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_status_tahun" 
            ON "asb" ("id_asb_status", "tahun_anggaran")
        `);

        // ✅ Composite index untuk filter OPD + tahun_anggaran
        // Digunakan di: findAll, getAsbAnalytics (untuk filter OPD dengan tahun)
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_opd_tahun" 
            ON "asb" ("id_opd", "tahun_anggaran")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes in reverse order
        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_asb_opd_tahun"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_asb_status_tahun"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_asb_opd_created_at"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_asb_tahun_anggaran"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_asb_created_at"
        `);
    }
}
