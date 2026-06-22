import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbBpsGalleryNonstd1764511437349 implements MigrationInterface {
    name = 'CreateAsbBpsGalleryNonstd1764511437349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_bps_gallery_nonstd" (
                "id" SERIAL NOT NULL,
                "id_asb_komponen_bangunan_nonstd" INTEGER,
                "id_asb" INTEGER,
                "filename" TEXT NOT NULL,
                "jumlah_bobot" DOUBLE PRECISION,
                "rincian_harga" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "upd ated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_bps_gallery_nonstd" PRIMARY KEY ("id")
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_bps_gallery_nonstd_komponen_bangunan_nonstd" ON "asb_bps_gallery_nonstd" ("id_asb_komponen_bangunan_nonstd")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bps_gallery_nonstd_deleted_at" ON "asb_bps_gallery_nonstd" ("deleted_at")`);

        // Add foreign key with CASCADE
        await queryRunner.query(`
            ALTER TABLE "asb_bps_gallery_nonstd"
            ADD CONSTRAINT "fk_asb_bps_gallery_nonstd_komponen_bangunan_nonstd"
            FOREIGN KEY ("id_asb_komponen_bangunan_nonstd")
            REFERENCES "asb_komponen_bangunan_nonstd"("id")
            ON DELETE CASCADE
        `);

        // Create trigger for updated_at (reuse existing function)
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_bps_gallery_nonstd_updated_at') THEN
                    CREATE TRIGGER set_asb_bps_gallery_nonstd_updated_at
                    BEFORE UPDATE ON "asb_bps_gallery_nonstd"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_bps_gallery_nonstd_updated_at ON "asb_bps_gallery_nonstd"`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_nonstd" DROP CONSTRAINT IF EXISTS "fk_asb_bps_gallery_nonstd_komponen_bangunan_nonstd"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bps_gallery_nonstd_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bps_gallery_nonstd_komponen_bangunan_nonstd"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_bps_gallery_nonstd"`);
    }
}
