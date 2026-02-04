import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePpnGlobalTable1766321582106 implements MigrationInterface {
    name = 'CreatePpnGlobalTable1766321582106';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "ppn_global" (
                "id" SERIAL PRIMARY KEY,
                "bulan" INTEGER NOT NULL,
                "tahun" INTEGER NOT NULL,
                "persentase_ppn" DECIMAL(15, 2) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Index for faster lookup by date
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_ppn_global_bulan_tahun" 
            ON "ppn_global" ("bulan", "tahun");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_ppn_global_bulan_tahun";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "ppn_global";`);
    }
}
