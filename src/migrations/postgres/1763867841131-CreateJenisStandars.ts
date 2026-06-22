import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJenisStandars1763867841131 implements MigrationInterface {
    name = 'CreateJenisStandars1763867841131';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jenis_standars" (
                "id" SERIAL PRIMARY KEY,
                "jenis" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jenis_standars_jenis" ON "jenis_standars" ("jenis");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jenis_standars_deleted" ON "jenis_standars" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jenis_standars_updated_at') THEN
                    CREATE TRIGGER set_jenis_standars_updated_at
                    BEFORE UPDATE ON "jenis_standars"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_jenis_standars_updated_at ON "jenis_standars";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jenis_standars_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jenis_standars_jenis";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jenis_standars";`);
    }
}
