import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbBipekStandardReview1764321020213 implements MigrationInterface {
    name = 'CreateAsbBipekStandardReview1764321020213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_bipek_standard_reviews" (
                "id" SERIAL NOT NULL,
                "id_asb_bipek_standard" INTEGER,
                "id_asb_komponen_bangunan_std" INTEGER,
                "files" VARCHAR(10) NOT NULL DEFAULT 'ORIGIN',
                "bobot_input" DOUBLE PRECISION,
                "calculation_method" VARCHAR(20),
                "jumlah_bobot" DOUBLE PRECISION,
                "rincian_harga" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_bipek_standard_reviews" PRIMARY KEY ("id"),
                CONSTRAINT "ck_asb_bipek_standard_reviews_files" CHECK ("files" IN ('ORIGIN', 'REVIEW')),
                CONSTRAINT "ck_asb_bipek_standard_reviews_calculation_method" CHECK ("calculation_method" IN ('min', 'avg', 'max', 'avg_min', 'avg_max'))
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standard_reviews_files" ON "asb_bipek_standard_reviews" ("files")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standard_reviews_bipek_standard" ON "asb_bipek_standard_reviews" ("id_asb_bipek_standard")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standard_reviews_komponen_bangunan_std" ON "asb_bipek_standard_reviews" ("id_asb_komponen_bangunan_std")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standard_reviews_calculation_method" ON "asb_bipek_standard_reviews" ("calculation_method")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standard_reviews_deleted_at" ON "asb_bipek_standard_reviews" ("deleted_at")`);

        // Add foreign key to asb_bipek_standard
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_standard_reviews"
            ADD CONSTRAINT "fk_asb_bipek_standard_reviews_bipek_standard"
            FOREIGN KEY ("id_asb_bipek_standard")
            REFERENCES "asb_bipek_standards"("id")
            ON DELETE SET NULL
        `);

        // Add foreign key to asb_komponen_bangunan_std
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_standard_reviews"
            ADD CONSTRAINT "fk_asb_bipek_standard_reviews_komponen_bangunan_std"
            FOREIGN KEY ("id_asb_komponen_bangunan_std")
            REFERENCES "asb_komponen_bangunan_stds"("id")
            ON DELETE SET NULL
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_bipek_standard_reviews_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_bipek_standard_reviews_updated_at
            BEFORE UPDATE ON "asb_bipek_standard_reviews"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_bipek_standard_reviews_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_bipek_standard_reviews_updated_at ON "asb_bipek_standard_reviews"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_bipek_standard_reviews_updated_at`);

        // Drop foreign keys
        await queryRunner.query(`ALTER TABLE "asb_bipek_standard_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_standard_reviews_komponen_bangunan_std"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_standard_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_standard_reviews_bipek_standard"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standard_reviews_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standard_reviews_calculation_method"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standard_reviews_komponen_bangunan_std"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standard_reviews_bipek_standard"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standard_reviews_files"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_bipek_standard_reviews"`);
    }
}
