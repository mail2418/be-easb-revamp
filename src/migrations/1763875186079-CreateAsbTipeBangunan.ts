import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbTipeBangunan1763875186079 implements MigrationInterface {
    name = 'CreateAsbTipeBangunan1763875186079';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_tipe_bangunan" (
                "id" SERIAL PRIMARY KEY,
                "tipe_bangunan" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_tipe_bangunan_tipe_bangunan" ON "asb_tipe_bangunan" ("tipe_bangunan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_tipe_bangunan_deleted" ON "asb_tipe_bangunan" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_tipe_bangunan_updated_at') THEN
                    CREATE TRIGGER set_asb_tipe_bangunan_updated_at
                    BEFORE UPDATE ON "asb_tipe_bangunan"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_tipe_bangunan_updated_at ON "asb_tipe_bangunan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_tipe_bangunan_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_tipe_bangunan_tipe_bangunan";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_tipe_bangunan";`);
    }
}
