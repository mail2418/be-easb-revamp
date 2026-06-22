import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAsbKomponenBangunanProsStd1764093605423 implements MigrationInterface {
    name = 'CreateAsbKomponenBangunanProsStd1764093605423';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_komponen_bangunan_pros_std" (
                "id" SERIAL PRIMARY KEY,
                "id_asb_komponen_bangunan_std" INTEGER NOT NULL,
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
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_std_komponen" ON "asb_komponen_bangunan_pros_std" ("id_asb_komponen_bangunan_std");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_std_deleted" ON "asb_komponen_bangunan_pros_std" ("deleted_at");
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_pros_std"
            ADD CONSTRAINT "fk_asb_komponen_bangunan_pros_komponen"
            FOREIGN KEY ("id_asb_komponen_bangunan_std")
            REFERENCES "asb_komponen_bangunan_stds"("id")
            ON DELETE CASCADE;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_komponen_bangunan_pros_std_updated_at') THEN
                    CREATE TRIGGER set_asb_komponen_bangunan_pros_std_updated_at
                    BEFORE UPDATE ON "asb_komponen_bangunan_pros_std"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_komponen_bangunan_pros_std_updated_at ON "asb_komponen_bangunan_pros_std";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_std_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_std_komponen";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros_std" DROP CONSTRAINT "fk_asb_komponen_bangunan_pros_komponen";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_komponen_bangunan_pros_std";`);
    }
}
