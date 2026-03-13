import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRekapitulasiBiayaToAsb1764760755980 implements MigrationInterface {
    name = 'AddRekapitulasiBiayaToAsb1764760755980';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add new columns to asb table
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "rekapitulasi_biaya_konstruksi" DECIMAL(10,2),
            ADD COLUMN IF NOT EXISTS "rekapitulasi_biaya_konstruksi_rounded" DECIMAL(10,2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the added columns
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "rekapitulasi_biaya_konstruksi_rounded",
            DROP COLUMN IF EXISTS "rekapitulasi_biaya_konstruksi";
        `);
    }
}
