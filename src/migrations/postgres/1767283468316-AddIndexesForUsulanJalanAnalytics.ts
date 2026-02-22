import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexesForUsulanJalanAnalytics1767283468316 implements MigrationInterface {
    name = 'AddIndexesForUsulanJalanAnalytics1767283468316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_created_at" 
            ON "usulan_jalan" ("created_at")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_tahun_anggaran" 
            ON "usulan_jalan" ("tahun_anggaran")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_opd_created_at" 
            ON "usulan_jalan" ("id_opd", "created_at")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_status_tahun" 
            ON "usulan_jalan" ("id_usulan_jalan_status", "tahun_anggaran")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_opd_tahun" 
            ON "usulan_jalan" ("id_opd", "tahun_anggaran")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_opd_tahun"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_status_tahun"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_opd_created_at"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_tahun_anggaran"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_created_at"
        `);
    }
}

