import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAsbJenis1763698487742 implements MigrationInterface {
    name = 'CreateAsbJenis1763698487742';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_jenis" (
                "id" SERIAL PRIMARY KEY,
                "jenis" VARCHAR(255) NOT NULL UNIQUE,
                "asb" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_jenis_jenis" ON "asb_jenis" ("jenis");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_jenis_asb" ON "asb_jenis" ("asb");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_jenis_deleted" ON "asb_jenis" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_jenis_updated_at') THEN
                    CREATE TRIGGER set_asb_jenis_updated_at
                    BEFORE UPDATE ON "asb_jenis"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_jenis_updated_at ON "asb_jenis";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jenis_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jenis_asb";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jenis_jenis";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_jenis";`);
    }
}
