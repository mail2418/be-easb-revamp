import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShsts1763971619865 implements MigrationInterface {
    name = 'CreateShsts1763971619865';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "shst" (
                "id" SERIAL PRIMARY KEY,
                "tahun" INTEGER NOT NULL,
                "nominal" DECIMAL(15,2) NOT NULL DEFAULT 0,
                "id_asb_tipe_bangunan" INTEGER NOT NULL,
                "id_asb_klasifikasi" INTEGER NOT NULL,
                "id_kabkota" INTEGER NOT NULL,
                "file" VARCHAR(500) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_shst_tahun" ON "shst" ("tahun");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_shst_tipe_bangunan_id" ON "shst" ("id_asb_tipe_bangunan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_shst_klasifikasi_id" ON "shst" ("id_asb_klasifikasi");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_shst_kabkota_id" ON "shst" ("id_kabkota");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_shst_deleted" ON "shst" ("deleted_at");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_shst_nominal" ON "shst" ("nominal");
        `);

        // Foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "shst" 
            ADD CONSTRAINT "FK_shst_tipe_bangunan" 
            FOREIGN KEY ("id_asb_tipe_bangunan") 
            REFERENCES "asb_tipe_bangunan"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "shst" 
            ADD CONSTRAINT "FK_shst_klasifikasi" 
            FOREIGN KEY ("id_asb_klasifikasi") 
            REFERENCES "asb_klasifikasi"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "shst" 
            ADD CONSTRAINT "FK_shst_kabkota" 
            FOREIGN KEY ("id_kabkota") 
            REFERENCES "kabkotas"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        // Unique constraint for preventing duplicates
        await queryRunner.query(`
            ALTER TABLE "shst"
            ADD CONSTRAINT "UQ_shst_unique"
            UNIQUE ("tahun", "id_asb_tipe_bangunan", "id_asb_klasifikasi", "id_kabkota");
        `);

        // Trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_shst_updated_at') THEN
                    CREATE TRIGGER set_shst_updated_at
                    BEFORE UPDATE ON "shst"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_shst_updated_at ON "shst";`);
        await queryRunner.query(`ALTER TABLE "shst" DROP CONSTRAINT "FK_shst_kabkota";`);
        await queryRunner.query(`ALTER TABLE "shst" DROP CONSTRAINT "FK_shst_klasifikasi";`);
        await queryRunner.query(`ALTER TABLE "shst" DROP CONSTRAINT "FK_shst_tipe_bangunan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_shst_nominal";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_shst_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_shst_kabkota_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_shst_klasifikasi_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_shst_tipe_bangunan_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_shst_tahun";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "shst";`);
    }
}
