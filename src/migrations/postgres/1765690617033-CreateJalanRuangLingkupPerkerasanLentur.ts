import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanRuangLingkupPerkerasanLentur1765690617033 implements MigrationInterface {
    name = 'CreateJalanRuangLingkupPerkerasanLentur1765690617033';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_ruang_lingkup_perkerasan_lentur" (
                "id" SERIAL PRIMARY KEY,
                "jenis" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_ruang_lingkup_perkerasan_lentur_jenis" ON "jalan_ruang_lingkup_perkerasan_lentur" ("jenis");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_ruang_lingkup_perkerasan_lentur_deleted" ON "jalan_ruang_lingkup_perkerasan_lentur" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_ruang_lingkup_perkerasan_lentur_updated_at') THEN
                    CREATE TRIGGER set_jalan_ruang_lingkup_perkerasan_lentur_updated_at
                    BEFORE UPDATE ON "jalan_ruang_lingkup_perkerasan_lentur"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_jalan_ruang_lingkup_perkerasan_lentur_updated_at ON "jalan_ruang_lingkup_perkerasan_lentur";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_ruang_lingkup_perkerasan_lentur_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_ruang_lingkup_perkerasan_lentur_jenis";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_ruang_lingkup_perkerasan_lentur";`);
    }
}

