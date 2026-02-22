import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSatuan1763651219930 implements MigrationInterface {
    name = 'CreateSatuan1763651219930';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "satuans" (
                "id" SERIAL PRIMARY KEY,
                "satuan" VARCHAR(255) NOT NULL UNIQUE,
                "is_active" BOOLEAN NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_satuans_satuan" ON "satuans" ("satuan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_satuans_active" ON "satuans" ("is_active");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_satuans_deleted" ON "satuans" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_satuans_updated_at') THEN
                    CREATE TRIGGER set_satuans_updated_at
                    BEFORE UPDATE ON "satuans"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_satuans_updated_at ON "satuans";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_satuans_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_satuans_active";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_satuans_satuan";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "satuans";`);
    }
}
