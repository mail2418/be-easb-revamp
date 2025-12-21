import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSmkkTable1766321582107 implements MigrationInterface {
    name = 'CreateJalanSmkkTable1766321582107';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_smkk" (
                "id" SERIAL PRIMARY KEY,
                "bulan" INTEGER NOT NULL,
                "tahun" INTEGER NOT NULL,
                "persentase_smkk" DECIMAL(15, 2) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Index for faster lookup by date
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_smkk_bulan_tahun" 
            ON "jalan_smkk" ("bulan", "tahun");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_smkk_bulan_tahun";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_smkk";`);
    }
}
