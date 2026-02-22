import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlamatToUsulanJalan1766843513216 implements MigrationInterface {
    name = 'AddAlamatToUsulanJalan1766843513216';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add alamat column to usulan_jalan table
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "alamat" TEXT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove alamat column from usulan_jalan table
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "alamat"
        `);
    }
}

