import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSaluranSmkkTable1767630754084 implements MigrationInterface {
    name = 'CreateJalanSaluranSmkkTable1767630754084';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_saluran_smkk" (
                "id" SERIAL PRIMARY KEY,
                "id_ruang_lingkup" INTEGER NOT NULL,
                "no_mata_pembayaran" VARCHAR(255) NOT NULL,
                "satuan" VARCHAR(255) NOT NULL,
                "harga_satuan" DECIMAL(15, 2) NULL,
                "uraian" TEXT NOT NULL,
                "pengali" DECIMAL(10, 2) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Foreign Key
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD CONSTRAINT "fk_jalan_saluran_smkk_ruang_lingkup"
            FOREIGN KEY ("id_ruang_lingkup")
            REFERENCES "jalan_saluran_ruang_lingkup"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        // Index
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_smkk_ruang_lingkup" 
            ON "jalan_saluran_smkk" ("id_ruang_lingkup");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_smkk_no_mata_pembayaran" 
            ON "jalan_saluran_smkk" ("no_mata_pembayaran");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_smkk_deleted" 
            ON "jalan_saluran_smkk" ("deleted_at");
        `);

        // Unique constraint to prevent duplicate combinations
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD CONSTRAINT "uq_jalan_saluran_smkk_ruang_lingkup_no_mata_uraian"
            UNIQUE ("id_ruang_lingkup", "no_mata_pembayaran", "uraian");
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_saluran_smkk_updated_at') THEN
                    CREATE TRIGGER set_jalan_saluran_smkk_updated_at
                    BEFORE UPDATE ON "jalan_saluran_smkk"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_jalan_saluran_smkk_updated_at ON "jalan_saluran_smkk";`,
        );
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_saluran_smkk_deleted";`);
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_jalan_saluran_smkk_no_mata_pembayaran";`,
        );
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_saluran_smkk_ruang_lingkup";`);
        await queryRunner.query(
            `ALTER TABLE "jalan_saluran_smkk" DROP CONSTRAINT IF EXISTS "uq_jalan_saluran_smkk_ruang_lingkup_no_mata_uraian";`,
        );
        await queryRunner.query(
            `ALTER TABLE "jalan_saluran_smkk" DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_smkk_ruang_lingkup";`,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_saluran_smkk";`);
    }
}
