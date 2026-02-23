import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPenyesuaianKonstruksiToAsb1770300000000 implements MigrationInterface {
    name = 'AddPenyesuaianKonstruksiToAsb1770300000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "penyesuaian_perencanaan_konstruksi" DECIMAL(20,2) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "penyesuaian_pengawasan_konstruksi" DECIMAL(20,2) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "penyesuaian_management_konstruksi" DECIMAL(20,2) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "penyesuaian_perencanaan_konstruksi"
        `);
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "penyesuaian_pengawasan_konstruksi"
        `);
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "penyesuaian_management_konstruksi"
        `);
    }
}
