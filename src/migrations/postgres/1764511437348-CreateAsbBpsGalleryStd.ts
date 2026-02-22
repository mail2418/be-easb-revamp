import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbBpsGalleryStd1764511437348 implements MigrationInterface {
    name = 'CreateAsbBpsGalleryStd1764511437348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create new table asb_bps_gallery_std
        await queryRunner.query(`
            CREATE TABLE "asb_bps_gallery_std" (
                "id" SERIAL NOT NULL,
                "id_asb_komponen_bangunan_std" INTEGER,
                "id_asb" INTEGER,
                "filename" TEXT NOT NULL,
                "jumlah_bobot" DOUBLE PRECISION,
                "rincian_harga" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_bps_gallery_std" PRIMARY KEY ("id")
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_bps_gallery_std_komponen_bangunan_std" ON "asb_bps_gallery_std" ("id_asb_komponen_bangunan_std")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bps_gallery_std_deleted_at" ON "asb_bps_gallery_std" ("deleted_at")`);

        // Add foreign key with CASCADE
        await queryRunner.query(`
            ALTER TABLE "asb_bps_gallery_std"
            ADD CONSTRAINT "fk_asb_bps_gallery_std_komponen_bangunan_std"
            FOREIGN KEY ("id_asb_komponen_bangunan_std")
            REFERENCES "asb_komponen_bangunan_stds"("id")
            ON DELETE CASCADE
        `);

        // Create trigger for updated_at (reuse existing function)
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_bps_gallery_std_updated_at') THEN
                    CREATE TRIGGER set_asb_bps_gallery_std_updated_at
                    BEFORE UPDATE ON "asb_bps_gallery_std"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_bps_gallery_std_updated_at ON "asb_bps_gallery_std"`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery_std" DROP CONSTRAINT IF EXISTS "fk_asb_bps_gallery_std_komponen_bangunan_std"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bps_gallery_std_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bps_gallery_std_komponen_bangunan_std"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_bps_gallery_std"`);
    }
}
