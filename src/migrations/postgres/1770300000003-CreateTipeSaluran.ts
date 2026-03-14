import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTipeSaluran1770300000003 implements MigrationInterface {
    name = 'CreateTipeSaluran1770300000003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "tipe_saluran" (
                "id" SERIAL PRIMARY KEY,
                "tipe_saluran" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_tipe_saluran_deleted" ON "tipe_saluran" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_tipe_saluran_updated_at') THEN
                    CREATE TRIGGER set_tipe_saluran_updated_at
                    BEFORE UPDATE ON "tipe_saluran"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_tipe_saluran_updated_at ON "tipe_saluran";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_tipe_saluran_deleted";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "tipe_saluran";`);
    }
}
