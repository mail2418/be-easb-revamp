import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJenisUsulanTable1766321582109 implements MigrationInterface {
    name = 'CreateJenisUsulanTable1766321582109';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jenis_usulan" (
                "id" SERIAL PRIMARY KEY,
                "jenis" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jenis_usulan_jenis" 
            ON "jenis_usulan" ("jenis");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jenis_usulan_jenis";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jenis_usulan";`);
    }
}
