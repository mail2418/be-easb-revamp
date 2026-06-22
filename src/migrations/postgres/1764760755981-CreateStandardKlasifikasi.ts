import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStandardKlasifikasi1764760755981 implements MigrationInterface {
    name = 'CreateStandardKlasifikasi1764760755981';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "standard_klasifikasi" (
                "id" SERIAL PRIMARY KEY,
                "uraian_standard" VARCHAR(500) NOT NULL,
                "uraian_spek" VARCHAR(500) NOT NULL,
                "inflasi" DECIMAL(15,2) NOT NULL DEFAULT 0,
                "id_asb_klasifikasi" INTEGER NOT NULL,
                "id_kabkota" INTEGER NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_standard_klasifikasi_asb_klasifikasi_id" 
            ON "standard_klasifikasi" ("id_asb_klasifikasi");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_standard_klasifikasi_kabkota_id" 
            ON "standard_klasifikasi" ("id_kabkota");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_standard_klasifikasi_deleted" 
            ON "standard_klasifikasi" ("deleted_at");
        `);

        // Foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "standard_klasifikasi" 
            ADD CONSTRAINT "FK_standard_klasifikasi_asb_klasifikasi" 
            FOREIGN KEY ("id_asb_klasifikasi") 
            REFERENCES "asb_klasifikasi"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "standard_klasifikasi" 
            ADD CONSTRAINT "FK_standard_klasifikasi_kabkota" 
            FOREIGN KEY ("id_kabkota") 
            REFERENCES "kabkotas"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        // Trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_standard_klasifikasi_updated_at') THEN
                    CREATE TRIGGER set_standard_klasifikasi_updated_at
                    BEFORE UPDATE ON "standard_klasifikasi"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_standard_klasifikasi_updated_at ON "standard_klasifikasi";`);
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" DROP CONSTRAINT "FK_standard_klasifikasi_kabkota";`);
        await queryRunner.query(`ALTER TABLE "standard_klasifikasi" DROP CONSTRAINT "FK_standard_klasifikasi_asb_klasifikasi";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_standard_klasifikasi_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_standard_klasifikasi_kabkota_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_standard_klasifikasi_asb_klasifikasi_id";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "standard_klasifikasi";`);
    }
}
