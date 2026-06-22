import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMainDashboardTable1767890341540 implements MigrationInterface {
    name = 'CreateMainDashboardTable1767890341540';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "main_dashboard" (
                "id" SERIAL PRIMARY KEY,
                "id_usulan" INTEGER NOT NULL,
                "id_jenis_usulan" INTEGER NOT NULL,
                "id_asb_status" INTEGER NOT NULL,
                "nama_usulan" TEXT NOT NULL,
                "reject_info" TEXT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
            );
        `);

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_main_dashboard_id_usulan" 
            ON "main_dashboard" ("id_usulan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_main_dashboard_id_jenis_usulan" 
            ON "main_dashboard" ("id_jenis_usulan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_main_dashboard_id_asb_status" 
            ON "main_dashboard" ("id_asb_status");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_main_dashboard_created_at" 
            ON "main_dashboard" ("created_at");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_main_dashboard_nama_usulan" 
            ON "main_dashboard" USING gin(to_tsvector('indonesian', "nama_usulan"));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_main_dashboard_nama_usulan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_main_dashboard_created_at";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_main_dashboard_id_asb_status";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_main_dashboard_id_jenis_usulan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_main_dashboard_id_usulan";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "main_dashboard";`);
    }
}
