import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRekenings1763797487474 implements MigrationInterface {
    name = 'CreateRekenings1763797487474';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "rekenings" (
                "id" SERIAL PRIMARY KEY,
                "rekening_kode" VARCHAR(255) NOT NULL UNIQUE,
                "rekening_uraian" VARCHAR(500) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rekenings_rekening_kode" ON "rekenings" ("rekening_kode");
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
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_rekenings_updated_at') THEN
                    CREATE TRIGGER set_rekenings_updated_at
                    BEFORE UPDATE ON "rekenings"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_rekenings_updated_at ON "rekenings";`);

        // Remove the function only if no other table is using it
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgfoid = (SELECT oid FROM pg_proc WHERE proname = 'set_updated_at')) THEN
                    DROP FUNCTION IF EXISTS set_updated_at;
                END IF;
            END $$;
        `);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rekenings_rekening_kode";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "rekenings";`);
    }
}
