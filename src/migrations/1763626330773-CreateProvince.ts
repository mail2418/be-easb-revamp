import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProvince1763626330773 implements MigrationInterface {
    name = 'CreateProvince1763626330773';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "provinces" (
                "id" SERIAL PRIMARY KEY,
                "kode" VARCHAR(10) NOT NULL UNIQUE,
                "nama" VARCHAR(255) NOT NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_provinces_kode" ON "provinces" ("kode");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_provinces_active" ON "provinces" ("is_active");
        `);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_provinces_updated_at') THEN
                    CREATE TRIGGER set_provinces_updated_at
                    BEFORE UPDATE ON "provinces"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_provinces_updated_at ON "provinces";`);

        // Remove the function only if no other table is using it
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgfoid = (SELECT oid FROM pg_proc WHERE proname = 'set_updated_at')) THEN
                    DROP FUNCTION IF EXISTS set_updated_at;
                END IF;
            END $$;
        `);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_provinces_active";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_provinces_kode";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "provinces";`);
    }
}
