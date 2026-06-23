import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSaluranRuangLingkupTable1766321582110 implements MigrationInterface {
    name = 'CreateJalanSaluranRuangLingkupTable1766321582110';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_saluran_ruang_lingkup" (
                "id" SERIAL PRIMARY KEY,
                "id_jenis_usulan" INTEGER NOT NULL,
                "deskripsi_ruang_lingkup" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Foreign Key
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_ruang_lingkup"
            ADD CONSTRAINT "fk_jalan_saluran_ruang_lingkup_jenis_usulan"
            FOREIGN KEY ("id_jenis_usulan")
            REFERENCES "jenis_usulan"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        // Index
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_ruang_lingkup_jenis" 
            ON "jalan_saluran_ruang_lingkup" ("id_jenis_usulan");
        `);

        // Unique constraint to prevent duplicate combinations
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_ruang_lingkup"
            ADD CONSTRAINT "uq_jalan_saluran_ruang_lingkup_jenis_deskripsi"
            UNIQUE ("id_jenis_usulan", "deskripsi_ruang_lingkup");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_saluran_ruang_lingkup_jenis";`);
        await queryRunner.query(
            `ALTER TABLE "jalan_saluran_ruang_lingkup" DROP CONSTRAINT IF EXISTS "uq_jalan_saluran_ruang_lingkup_jenis_deskripsi";`,
        );
        await queryRunner.query(
            `ALTER TABLE "jalan_saluran_ruang_lingkup" DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_ruang_lingkup_jenis_usulan";`,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_saluran_ruang_lingkup";`);
    }
}
