import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbBipekNonStdReview1764337043412 implements MigrationInterface {
    name = 'CreateAsbBipekNonStdReview1764337043412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_bipek_non_std_reviews" (
                "id" SERIAL NOT NULL,
                "id_asb_bipek_non_std" INTEGER NOT NULL,
                "id_asb_komponen_bangunan_nonstd" INTEGER,
                "files" VARCHAR(10) NOT NULL DEFAULT 'ORIGIN',
                "bobot_input" DOUBLE PRECISION,
                "calculation_method" VARCHAR(20),
                "bobot_input_prosentase" DOUBLE PRECISION,
                "jumlah_bobot" DOUBLE PRECISION,
                "rincian_harga" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_bipek_non_std_reviews" PRIMARY KEY ("id"),
                CONSTRAINT "ck_asb_bipek_non_std_reviews_files" CHECK ("files" IN ('ORIGIN', 'REVIEW'))
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_std_reviews_files" ON "asb_bipek_non_std_reviews" ("files")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_std_reviews_bipek_non_std" ON "asb_bipek_non_std_reviews" ("id_asb_bipek_non_std")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_std_reviews_komponen_bangunan_nonstd" ON "asb_bipek_non_std_reviews" ("id_asb_komponen_bangunan_nonstd")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_std_reviews_deleted_at" ON "asb_bipek_non_std_reviews" ("deleted_at")`);

        // Add foreign key to asb_bipek_non_std
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            ADD CONSTRAINT "fk_asb_bipek_non_std_reviews_bipek_non_std"
            FOREIGN KEY ("id_asb_bipek_non_std")
            REFERENCES "asb_bipek_non_stds"("id")
            ON DELETE SET NULL
        `);

        // Add foreign key to asb_komponen_bangunan_nonstd
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            ADD CONSTRAINT "fk_asb_bipek_non_std_reviews_komponen_bangunan_nonstd"
            FOREIGN KEY ("id_asb_komponen_bangunan_nonstd")
            REFERENCES "asb_komponen_bangunan_nonstd"("id")
            ON DELETE SET NULL
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_bipek_non_std_reviews_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_bipek_non_std_reviews_updated_at
            BEFORE UPDATE ON "asb_bipek_non_std_reviews"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_bipek_non_std_reviews_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_bipek_non_std_reviews_updated_at ON "asb_bipek_non_std_reviews"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_bipek_non_std_reviews_updated_at`);

        // Drop foreign keys
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_std_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_non_std_reviews_komponen_bangunan_nonstd"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_std_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_non_std_reviews_bipek_non_std"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_std_reviews_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_std_reviews_komponen_bangunan_nonstd"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_std_reviews_bipek_non_std"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_std_reviews_files"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_bipek_non_std_reviews"`);
    }
}
