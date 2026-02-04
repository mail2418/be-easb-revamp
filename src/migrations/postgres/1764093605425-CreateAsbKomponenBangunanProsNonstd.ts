import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAsbKomponenBangunanProsNonstd1764093605425 implements MigrationInterface {
    name = 'CreateAsbKomponenBangunanProsNonstd1764093605425';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_komponen_bangunan_pros_nonstd" (
                "id" SERIAL PRIMARY KEY,
                "id_asb_komponen_bangunan_nonstd" INTEGER NOT NULL,
                "min" DOUBLE PRECISION,
                "avg_min" DOUBLE PRECISION,
                "avg" DOUBLE PRECISION,
                "avg_max" DOUBLE PRECISION,
                "max" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_nonstd_komponen" ON "asb_komponen_bangunan_pros_nonstd" ("id_asb_komponen_bangunan_nonstd");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_nonstd_deleted" ON "asb_komponen_bangunan_pros_nonstd" ("deleted_at");
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_pros_nonstd"
            ADD CONSTRAINT "fk_asb_komponen_bangunan_pros_nonstd_komponen"
            FOREIGN KEY ("id_asb_komponen_bangunan_nonstd")
            REFERENCES "asb_komponen_bangunan_nonstd"("id")
            ON DELETE CASCADE;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_komponen_bangunan_pros_nonstd_updated_at') THEN
                    CREATE TRIGGER set_asb_komponen_bangunan_pros_nonstd_updated_at
                    BEFORE UPDATE ON "asb_komponen_bangunan_pros_nonstd"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_komponen_bangunan_pros_nonstd_updated_at ON "asb_komponen_bangunan_pros_nonstd";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_nonstd_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_nonstd_komponen";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_komponen_bangunan_pros_nonstd";`);
    }
}
