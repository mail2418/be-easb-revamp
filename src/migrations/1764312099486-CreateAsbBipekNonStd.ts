import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbBipekNonStd1764312099486 implements MigrationInterface {
    name = 'CreateAsbBipekNonStd1764312099486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_bipek_non_stds" (
                "id" SERIAL NOT NULL,
                "files" VARCHAR(10) NOT NULL DEFAULT 'ORIGIN',
                "id_asb_komponen_bangunan_nonstd" INTEGER,
                "bobot_input" DOUBLE PRECISION,
                "bobot_input_prosentase" DOUBLE PRECISION,
                "calculation_method" VARCHAR(20),
                "jumlah_bobot" DOUBLE PRECISION,
                "rincian_harga" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_bipek_non_stds" PRIMARY KEY ("id"),
                CONSTRAINT "ck_asb_bipek_non_stds_files" CHECK ("files" IN ('ORIGIN', 'REVIEW'))
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_stds_files" ON "asb_bipek_non_stds" ("files")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_stds_komponen_bangunan_nonstd" ON "asb_bipek_non_stds" ("id_asb_komponen_bangunan_nonstd")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_stds_deleted_at" ON "asb_bipek_non_stds" ("deleted_at")`);

        // Add foreign key to asb_komponen_bangunan_nonstd
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_stds"
            ADD CONSTRAINT "fk_asb_bipek_non_stds_komponen_bangunan_nonstd"
            FOREIGN KEY ("id_asb_komponen_bangunan_nonstd")
            REFERENCES "asb_komponen_bangunan_nonstd"("id")
            ON DELETE SET NULL
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_bipek_non_stds_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_bipek_non_stds_updated_at
            BEFORE UPDATE ON "asb_bipek_non_stds"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_bipek_non_stds_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_bipek_non_stds_updated_at ON "asb_bipek_non_stds"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_bipek_non_stds_updated_at`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_stds" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_non_stds_komponen_bangunan_nonstd"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_stds_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_stds_komponen_bangunan_nonstd"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_stds_files"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_bipek_non_stds"`);
    }
}
