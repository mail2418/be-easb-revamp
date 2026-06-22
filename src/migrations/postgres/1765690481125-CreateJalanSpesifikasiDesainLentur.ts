import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSpesifikasiDesainLentur1765690481125 implements MigrationInterface {
    name = 'CreateJalanSpesifikasiDesainLentur1765690481125';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_spesifikasi_desain_lentur" (
                "id" SERIAL PRIMARY KEY,
                "spec" VARCHAR(255) NOT NULL UNIQUE,
                "desc" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_spesifikasi_desain_lentur_spec" ON "jalan_spesifikasi_desain_lentur" ("spec");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_spesifikasi_desain_lentur_deleted" ON "jalan_spesifikasi_desain_lentur" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_spesifikasi_desain_lentur_updated_at') THEN
                    CREATE TRIGGER set_jalan_spesifikasi_desain_lentur_updated_at
                    BEFORE UPDATE ON "jalan_spesifikasi_desain_lentur"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_jalan_spesifikasi_desain_lentur_updated_at ON "jalan_spesifikasi_desain_lentur";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_spesifikasi_desain_lentur_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_spesifikasi_desain_lentur_spec";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_spesifikasi_desain_lentur";`);
    }
}

