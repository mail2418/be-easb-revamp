import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbKlasifikasis1763916030120 implements MigrationInterface {
    name = 'CreateAsbKlasifikasis1763916030120';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_klasifikasi" (
                "id" SERIAL PRIMARY KEY,
                "klasifikasi" VARCHAR(255) NOT NULL,
                "id_asb_tipe_bangunan" INTEGER NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_klasifikasi_klasifikasi" ON "asb_klasifikasi" ("klasifikasi");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_klasifikasi_tipe_bangunan_id" ON "asb_klasifikasi" ("id_asb_tipe_bangunan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_klasifikasi_deleted" ON "asb_klasifikasi" ("deleted_at");
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_klasifikasi" 
            ADD CONSTRAINT "FK_asb_klasifikasi_tipe_bangunan" 
            FOREIGN KEY ("id_asb_tipe_bangunan") 
            REFERENCES "asb_tipe_bangunan"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_klasifikasi"
            ADD CONSTRAINT "UQ_asb_klasifikasi_klasifikasi_tipe"
            UNIQUE ("klasifikasi", "id_asb_tipe_bangunan");
    `)

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_klasifikasi_updated_at') THEN
                    CREATE TRIGGER set_asb_klasifikasi_updated_at
                    BEFORE UPDATE ON "asb_klasifikasi"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_klasifikasi_updated_at ON "asb_klasifikasi";`);
        await queryRunner.query(`ALTER TABLE "asb_klasifikasi" DROP CONSTRAINT "FK_asb_klasifikasi_tipe_bangunan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_klasifikasi_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_klasifikasi_tipe_bangunan_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_klasifikasi_klasifikasi";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_klasifikasi";`);
    }
}
