import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanJenisPerkerasan1765690322931 implements MigrationInterface {
    name = 'CreateJalanJenisPerkerasan1765690322931';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_jenis_perkerasan" (
                "id" SERIAL PRIMARY KEY,
                "jenis" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_jenis_perkerasan_jenis" ON "jalan_jenis_perkerasan" ("jenis");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_jenis_perkerasan_deleted" ON "jalan_jenis_perkerasan" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_jenis_perkerasan_updated_at') THEN
                    CREATE TRIGGER set_jalan_jenis_perkerasan_updated_at
                    BEFORE UPDATE ON "jalan_jenis_perkerasan"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_jalan_jenis_perkerasan_updated_at ON "jalan_jenis_perkerasan";`,
        );
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_jenis_perkerasan_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_jenis_perkerasan_jenis";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_jenis_perkerasan";`);
    }
}
