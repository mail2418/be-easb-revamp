import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsToAsb1764830114461 implements MigrationInterface {
    name = 'AddFieldsToAsb1764830114461';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add new columns to asb table
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "luas_total_bangunan" DOUBLE PRECISION,
            ADD COLUMN IF NOT EXISTS "koefisien_lantai_total" DOUBLE PRECISION,
            ADD COLUMN IF NOT EXISTS "koefisien_fungsi_ruang_total" DOUBLE PRECISION,
            ADD COLUMN IF NOT EXISTS "total_biaya_pembangunan" DECIMAL(20,2),
            ADD COLUMN IF NOT EXISTS
            "nominal_bps" DECIMAL(20,2),
            ADD COLUMN IF NOT EXISTS
            "nominal_bpns" DECIMAL(20,2),
            ADD COLUMN IF NOT EXISTS
            "bobot_total_bps" DECIMAL(20,2),
            ADD COLUMN IF NOT EXISTS
            "bobot_total_bpns" DECIMAL(20,2)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the added columns
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "total_biaya_pembangunan",
            DROP COLUMN IF EXISTS "koefisien_fungsi_ruang_total",
            DROP COLUMN IF EXISTS "koefisien_lantai_total",
            DROP COLUMN IF EXISTS "luas_total_bangunan",
            DROP COLUMN IF EXISTS "nominal_bps",
            DROP COLUMN IF EXISTS "nominal_bpns",
            DROP COLUMN IF EXISTS "bobot_total_bps",
            DROP COLUMN IF EXISTS "bobot_total_bpns"
        `);
    }
}
