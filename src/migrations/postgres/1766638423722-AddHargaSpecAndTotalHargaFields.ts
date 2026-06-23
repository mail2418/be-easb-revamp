import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHargaSpecAndTotalHargaFields1766638423722 implements MigrationInterface {
    name = 'AddHargaSpecAndTotalHargaFieldsAndRemoveHargaSatuan1766638423722';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add harga_spec column to jalan_spesifikasi_desain
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain"
            ADD COLUMN IF NOT EXISTS "harga_spec" DOUBLE PRECISION NOT NULL DEFAULT 0
        `);

        // Add harga_spec_review column to jalan_spesifikasi_desain_review
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            ADD COLUMN IF NOT EXISTS "harga_spec_review" DOUBLE PRECISION NOT NULL DEFAULT 0
        `);

        // Add total_harga column to usulan_jalan
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "total_harga" DECIMAL(15,2) NULL
        `);

        // Remove harga_satuan column from usulan_jalan
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "harga_satuan"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert: Add harga_satuan column back to usulan_jalan
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "harga_satuan" DECIMAL(15,2) NULL
        `);

        // Remove the added columns
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "total_harga"
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain_review"
            DROP COLUMN IF EXISTS "harga_spec_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain"
            DROP COLUMN IF EXISTS "harga_spec"
        `);
    }
}
