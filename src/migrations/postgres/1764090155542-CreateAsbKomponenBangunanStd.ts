import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAsbKomponenBangunanStd1764090155542 implements MigrationInterface {
    name = 'CreateAsbKomponenBangunanStd1764090155542';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_komponen_bangunan_stds" (
                "id" SERIAL PRIMARY KEY,
                "komponen" VARCHAR(255) NOT NULL,
                "files" VARCHAR(20) NOT NULL,
                "id_asb_jenis" INTEGER NOT NULL,
                "id_asb_tipe_bangunan" INTEGER NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_std_komponen" ON "asb_komponen_bangunan_stds" ("komponen");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_std_files" ON "asb_komponen_bangunan_stds" ("files");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_std_id_asb_jenis" ON "asb_komponen_bangunan_stds" ("id_asb_jenis");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_std_id_asb_tipe_bangunan" ON "asb_komponen_bangunan_stds" ("id_asb_tipe_bangunan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_std_deleted" ON "asb_komponen_bangunan_stds" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_komponen_bangunan_std_updated_at') THEN
                    CREATE TRIGGER set_asb_komponen_bangunan_std_updated_at
                    BEFORE UPDATE ON "asb_komponen_bangunan_stds"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);

        // Add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_stds" ADD CONSTRAINT "fk_asb_komponen_bangunan_stds_id_asb_jenis" 
            FOREIGN KEY ("id_asb_jenis") REFERENCES "asb_jenis" ("id") 
            ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_stds" ADD CONSTRAINT "fk_asb_komponen_bangunan_stds_id_asb_tipe_bangunan" 
            FOREIGN KEY ("id_asb_tipe_bangunan") REFERENCES "asb_tipe_bangunan" ("id") 
            ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_stds_id_asb_jenis";`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_stds" DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_stds_id_asb_tipe_bangunan";`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_komponen_bangunan_stds_updated_at ON "asb_komponen_bangunan_stds";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_stds_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_stds_id_asb_jenis";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_stds_files";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_stds_id_asb_tipe_bangunan";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_komponen_bangunan_stds";`);
    }
}
