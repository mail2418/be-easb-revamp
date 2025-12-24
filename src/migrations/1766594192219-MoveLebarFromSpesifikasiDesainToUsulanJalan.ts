import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveLebarFromSpesifikasiDesainToUsulanJalan1766594192219 implements MigrationInterface {
    name = 'MoveLebarFromSpesifikasiDesainToUsulanJalan1766594192219';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remove lebar column from jalan_spesifikasi_desain
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain"
            DROP COLUMN IF EXISTS "lebar"
        `);

        // Remove lebar_review column from jalan_spesifikasi_desain_review
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            DROP COLUMN IF EXISTS "lebar_review"
        `);

        // Add lebar column to usulan_jalan
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "lebar" DOUBLE PRECISION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove lebar column from usulan_jalan
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "lebar"
        `);

        // Re-add lebar_review column to jalan_spesifikasi_desain_review
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            ADD COLUMN IF NOT EXISTS "lebar_review" DOUBLE PRECISION NOT NULL DEFAULT 0
        `);

        // Remove default after adding (for consistency with original schema)
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            ALTER COLUMN "lebar_review" DROP DEFAULT
        `);

        // Re-add lebar column to jalan_spesifikasi_desain
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain"
            ADD COLUMN IF NOT EXISTS "lebar" DOUBLE PRECISION NOT NULL DEFAULT 0
        `);

        // Remove default after adding (for consistency with original schema)
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain"
            ALTER COLUMN "lebar" DROP DEFAULT
        `);
    }
}

