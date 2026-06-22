import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAsbFungsiRuang1763655079732 implements MigrationInterface {
    name = 'CreateAsbFungsiRuang1763655079732';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_fungsi_ruangs" (
                "id" SERIAL PRIMARY KEY,
                "nama_fungsi_ruang" VARCHAR(255) NOT NULL UNIQUE,
                "koef" DECIMAL(10,2) NOT NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_fungsi_ruangs_nama" ON "asb_fungsi_ruangs" ("nama_fungsi_ruang");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_fungsi_ruangs_active" ON "asb_fungsi_ruangs" ("is_active");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_fungsi_ruangs_deleted" ON "asb_fungsi_ruangs" ("deleted_at");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_fungsi_ruangs_koef" ON "asb_fungsi_ruangs" ("koef");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_fungsi_ruangs_updated_at') THEN
                    CREATE TRIGGER set_asb_fungsi_ruangs_updated_at
                    BEFORE UPDATE ON "asb_fungsi_ruangs"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_fungsi_ruangs_updated_at ON "asb_fungsi_ruangs";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_fungsi_ruangs_koef";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_fungsi_ruangs_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_fungsi_ruangs_active";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_fungsi_ruangs_nama";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_fungsi_ruangs";`);
    }
}
