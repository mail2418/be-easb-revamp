import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRencanaTahunAnggarans1783000000000 implements MigrationInterface {
    name = 'CreateRencanaTahunAnggarans1783000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "rencana_tahun_anggarans" (
                "id" SERIAL PRIMARY KEY,
                "tahun" INT NOT NULL UNIQUE,
                "is_active" BOOLEAN NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rencana_tahun_anggarans_tahun" ON "rencana_tahun_anggarans" ("tahun");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rencana_tahun_anggarans_active" ON "rencana_tahun_anggarans" ("is_active");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rencana_tahun_anggarans_deleted" ON "rencana_tahun_anggarans" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_rencana_tahun_anggarans_updated_at') THEN
                    CREATE TRIGGER set_rencana_tahun_anggarans_updated_at
                    BEFORE UPDATE ON "rencana_tahun_anggarans"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);

        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        await queryRunner.query(`
            INSERT INTO "rencana_tahun_anggarans" ("tahun", "is_active")
            VALUES (${currentYear}, true), (${nextYear}, true)
            ON CONFLICT ("tahun") DO NOTHING;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_rencana_tahun_anggarans_updated_at ON "rencana_tahun_anggarans";`,
        );
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rencana_tahun_anggarans_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rencana_tahun_anggarans_active";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_rencana_tahun_anggarans_tahun";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "rencana_tahun_anggarans";`);
    }
}
