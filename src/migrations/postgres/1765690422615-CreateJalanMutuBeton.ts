import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanMutuBeton1765690422615 implements MigrationInterface {
    name = 'CreateJalanMutuBeton1765690422615';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_mutu_beton" (
                "id" SERIAL PRIMARY KEY,
                "jenis" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_mutu_beton_jenis" ON "jalan_mutu_beton" ("jenis");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_mutu_beton_deleted" ON "jalan_mutu_beton" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_mutu_beton_updated_at') THEN
                    CREATE TRIGGER set_jalan_mutu_beton_updated_at
                    BEFORE UPDATE ON "jalan_mutu_beton"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_jalan_mutu_beton_updated_at ON "jalan_mutu_beton";`,
        );
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_mutu_beton_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_mutu_beton_jenis";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_mutu_beton";`);
    }
}
