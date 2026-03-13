import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbDetailReview1764316863490 implements MigrationInterface {
    name = 'CreateAsbDetailReview1764316863490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_detail_reviews" (
                "id" SERIAL NOT NULL,
                "id_asb_detail" INTEGER,
                "files" VARCHAR(10) NOT NULL DEFAULT 'ORIGIN',
                "id_asb_lantai" INTEGER,
                "id_asb_fungsi_ruang" INTEGER,
                "asb_fungsi_ruang_koef" DOUBLE PRECISION,
                "lantai_koef" DOUBLE PRECISION,
                "luas" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_detail_reviews" PRIMARY KEY ("id"),
                CONSTRAINT "ck_asb_detail_reviews_files" CHECK ("files" IN ('ORIGIN', 'REVIEW'))
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_detail_reviews_files" ON "asb_detail_reviews" ("files")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_detail_reviews_detail" ON "asb_detail_reviews" ("id_asb_detail")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_detail_reviews_lantai" ON "asb_detail_reviews" ("id_asb_lantai")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_detail_reviews_fungsi_ruang" ON "asb_detail_reviews" ("id_asb_fungsi_ruang")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_detail_reviews_deleted_at" ON "asb_detail_reviews" ("deleted_at")`);

        // Add foreign key to asb_detail
        await queryRunner.query(`
            ALTER TABLE "asb_detail_reviews"
            ADD CONSTRAINT "fk_asb_detail_reviews_detail"
            FOREIGN KEY ("id_asb_detail")
            REFERENCES "asb_details"("id")
            ON DELETE SET NULL
        `);

        // Add foreign key to asb_lantai
        await queryRunner.query(`
            ALTER TABLE "asb_detail_reviews"
            ADD CONSTRAINT "fk_asb_detail_reviews_lantai"
            FOREIGN KEY ("id_asb_lantai")
            REFERENCES "asb_lantais"("id")
            ON DELETE SET NULL
        `);

        // Add foreign key to asb_fungsi_ruang
        await queryRunner.query(`
            ALTER TABLE "asb_detail_reviews"
            ADD CONSTRAINT "fk_asb_detail_reviews_fungsi_ruang"
            FOREIGN KEY ("id_asb_fungsi_ruang")
            REFERENCES "asb_fungsi_ruangs"("id")
            ON DELETE SET NULL
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_detail_reviews_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_detail_reviews_updated_at
            BEFORE UPDATE ON "asb_detail_reviews"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_detail_reviews_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_detail_reviews_updated_at ON "asb_detail_reviews"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_detail_reviews_updated_at`);

        // Drop foreign keys
        await queryRunner.query(`ALTER TABLE "asb_detail_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_detail_reviews_fungsi_ruang"`);
        await queryRunner.query(`ALTER TABLE "asb_detail_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_detail_reviews_lantai"`);
        await queryRunner.query(`ALTER TABLE "asb_detail_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_detail_reviews_detail"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_detail_reviews_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_detail_reviews_fungsi_ruang"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_detail_reviews_lantai"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_detail_reviews_detail"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_detail_reviews_files"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_detail_reviews"`);
    }
}
