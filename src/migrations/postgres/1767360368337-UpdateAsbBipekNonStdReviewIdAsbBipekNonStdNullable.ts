import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAsbBipekNonStdReviewIdAsbBipekNonStdNullable1767360368337 implements MigrationInterface {
    name = 'UpdateAsbBipekNonStdReviewIdAsbBipekNonStdNullable1767360368337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint first
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            DROP CONSTRAINT IF EXISTS "fk_asb_bipek_non_std_reviews_bipek_non_std"
        `);

        // Alter column to allow NULL
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            ALTER COLUMN "id_asb_bipek_non_std" DROP NOT NULL
        `);

        // Re-add foreign key constraint with ON DELETE SET NULL
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            ADD CONSTRAINT "fk_asb_bipek_non_std_reviews_bipek_non_std"
            FOREIGN KEY ("id_asb_bipek_non_std")
            REFERENCES "asb_bipek_non_stds"("id")
            ON DELETE SET NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            DROP CONSTRAINT IF EXISTS "fk_asb_bipek_non_std_reviews_bipek_non_std"
        `);

        // Delete records with NULL id_asb_bipek_non_std before setting NOT NULL
        // This is necessary because we cannot set NOT NULL on a column that has NULL values
        await queryRunner.query(`
            DELETE FROM "asb_bipek_non_std_reviews"
            WHERE "id_asb_bipek_non_std" IS NULL
        `);

        // Alter column back to NOT NULL
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            ALTER COLUMN "id_asb_bipek_non_std" SET NOT NULL
        `);

        // Re-add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_non_std_reviews"
            ADD CONSTRAINT "fk_asb_bipek_non_std_reviews_bipek_non_std"
            FOREIGN KEY ("id_asb_bipek_non_std")
            REFERENCES "asb_bipek_non_stds"("id")
            ON DELETE SET NULL
        `);
    }
}

