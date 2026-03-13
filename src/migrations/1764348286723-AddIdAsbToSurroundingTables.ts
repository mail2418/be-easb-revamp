import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdAsbToSurroundingTables1764348286723 implements MigrationInterface {
    name = "AddIdAsbToSurroundingTables1764348286723"

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add id_asb column to all 9 tables

        // 1. asb_detail
        await queryRunner.query(`ALTER TABLE "asb_details" ADD COLUMN "id_asb" INTEGER`);
        await queryRunner.query(`CREATE INDEX "idx_asb_detail_asb" ON "asb_details" ("id_asb")`);
        await queryRunner.query(`
            ALTER TABLE "asb_details"
            ADD CONSTRAINT "fk_asb_detail_asb"
            FOREIGN KEY ("id_asb") REFERENCES "asb"("id") ON DELETE SET NULL
        `);
        // 2. asb_bipek_standards
        await queryRunner.query(`ALTER TABLE "asb_bipek_standards" ADD COLUMN "id_asb" INTEGER`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standards_asb" ON "asb_bipek_standards" ("id_asb")`);
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_standards"
            ADD CONSTRAINT "fk_asb_bipek_standards_asb"
            FOREIGN KEY ("id_asb") REFERENCES "asb"("id") ON DELETE SET NULL
        `);
        // 3. asb_bipek_non_stds
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_stds" ADD COLUMN "id_asb" INTEGER`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_stds_asb" ON "asb_bipek_non_stds" ("id_asb")`);
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_stds"
            ADD CONSTRAINT "fk_asb_bipek_non_stds_asb"
            FOREIGN KEY ("id_asb") REFERENCES "asb"("id") ON DELETE SET NULL
        `);
        // 4. asb_detail_reviews
        await queryRunner.query(`ALTER TABLE "asb_detail_reviews" ADD COLUMN "id_asb" INTEGER`);
        await queryRunner.query(`CREATE INDEX "idx_asb_detail_reviews_asb" ON "asb_detail_reviews" ("id_asb")`);
        await queryRunner.query(`
            ALTER TABLE "asb_detail_reviews"
            ADD CONSTRAINT "fk_asb_detail_reviews_asb"
            FOREIGN KEY ("id_asb") REFERENCES "asb"("id") ON DELETE SET NULL
        `);
        // 5. asb_bipek_standard_reviews
        await queryRunner.query(`ALTER TABLE "asb_bipek_standard_reviews" ADD COLUMN "id_asb" INTEGER`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standard_reviews_asb" ON "asb_bipek_standard_reviews" ("id_asb")`);
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_standard_reviews"
            ADD CONSTRAINT "fk_asb_bipek_standard_reviews_asb"
            FOREIGN KEY ("id_asb") REFERENCES "asb"("id") ON DELETE SET NULL
        `);
        // 6. asb_bipek_non_std_reviews
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_std_reviews" ADD COLUMN "id_asb" INTEGER`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_non_std_reviews_asb" ON "asb_bipek_non_std_reviews" ("id_asb")`);
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            ADD CONSTRAINT "fk_asb_bipek_non_std_reviews_asb"
            FOREIGN KEY ("id_asb") REFERENCES "asb"("id") ON DELETE SET NULL
        `);
        // 7. asb_log
        await queryRunner.query(`ALTER TABLE "asb_log" ADD COLUMN "id_asb" INTEGER`);
        await queryRunner.query(`CREATE INDEX "idx_asb_log_asb" ON "asb_log" ("id_asb")`);
        await queryRunner.query(`
            ALTER TABLE "asb_log"
            ADD CONSTRAINT "fk_asb_log_asb"
            FOREIGN KEY ("id_asb") REFERENCES "asb"("id") ON DELETE SET NULL
        `);
        // 8. asb_document
        await queryRunner.query(`ALTER TABLE "asb_document" ADD COLUMN "id_asb" INTEGER`);
        await queryRunner.query(`CREATE INDEX "idx_asb_document_asb" ON "asb_document" ("id_asb")`);
        await queryRunner.query(`
            ALTER TABLE "asb_document"
            ADD CONSTRAINT "fk_asb_document_asb"
            FOREIGN KEY ("id_asb") REFERENCES "asb"("id") ON DELETE SET NULL
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop in reverse order

        // Drop foreign keys
        await queryRunner.query(`ALTER TABLE "asb_document" DROP CONSTRAINT IF EXISTS "fk_asb_document_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_log" DROP CONSTRAINT IF EXISTS "fk_asb_log_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_std_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_non_std_reviews_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_standard_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_standard_reviews_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_detail_reviews" DROP CONSTRAINT IF EXISTS "fk_asb_detail_reviews_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_stds" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_non_stds_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_standards" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_standards_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_detail" DROP CONSTRAINT IF EXISTS "fk_asb_detail_asb"`);
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_document_asb"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_log_asb"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_std_reviews_asb"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standard_reviews_asb"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_detail_reviews_asb"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_non_stds_asb"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standards_asb"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_detail_asb"`);
        // Drop columns
        await queryRunner.query(`ALTER TABLE "asb_document" DROP COLUMN "id_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_log" DROP COLUMN "id_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_std_reviews" DROP COLUMN "id_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_standard_reviews" DROP COLUMN "id_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_detail_reviews" DROP COLUMN "id_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_non_stds" DROP COLUMN "id_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_bipek_standards" DROP COLUMN "id_asb"`);
        await queryRunner.query(`ALTER TABLE "asb_details" DROP COLUMN "id_asb"`);
    }
}