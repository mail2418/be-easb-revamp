import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropIdSpesifikasiDesainFromJalanSpesifikasiDesainReview1767546826914
    implements MigrationInterface
{
    name = 'DropIdSpesifikasiDesainFromJalanSpesifikasiDesainReview1767546826914';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            DROP CONSTRAINT IF EXISTS "fk_jalan_spesifikasi_desain_review_spesifikasi_desain";
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_spesifikasi_desain_review_spesifikasi_desain";
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            DROP COLUMN IF EXISTS "id_spesifikasi_desain";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            ADD COLUMN "id_spesifikasi_desain" INTEGER;
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            ADD CONSTRAINT "fk_jalan_spesifikasi_desain_review_spesifikasi_desain"
            FOREIGN KEY ("id_spesifikasi_desain")
            REFERENCES "jalan_spesifikasi_desain"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_spesifikasi_desain_review_spesifikasi_desain" 
            ON "jalan_spesifikasi_desain_review" ("id_spesifikasi_desain");
        `);
    }
}
