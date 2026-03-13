import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAsbKomponenBangunanNonstd1764092250588 implements MigrationInterface {
    name = 'CreateAsbKomponenBangunanNonstd1764092250588';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_komponen_bangunan_nonstd" (
                "id" SERIAL PRIMARY KEY,
                "komponen" VARCHAR(255) NOT NULL,
                "bobot_min" DOUBLE PRECISION NOT NULL,
                "bobot" DOUBLE PRECISION NOT NULL,
                "bobot_max" DOUBLE PRECISION NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_nonstd_komponen" ON "asb_komponen_bangunan_nonstd" ("komponen");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_nonstd_deleted" ON "asb_komponen_bangunan_nonstd" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_komponen_bangunan_nonstd_updated_at') THEN
                    CREATE TRIGGER set_asb_komponen_bangunan_nonstd_updated_at
                    BEFORE UPDATE ON "asb_komponen_bangunan_nonstd"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_komponen_bangunan_nonstd_updated_at ON "asb_komponen_bangunan_nonstd";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_nonstd_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_nonstd_komponen";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_komponen_bangunan_nonstd";`);
    }
}
