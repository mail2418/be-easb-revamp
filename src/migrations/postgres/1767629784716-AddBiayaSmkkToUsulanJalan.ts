import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBiayaSmkkToUsulanJalan1767629784716 implements MigrationInterface {
    name = 'AddBiayaSmkkToUsulanJalan1767629784716';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add biaya_smkk column to usulan_jalan
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "biaya_smkk" DECIMAL(15,2) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the added column
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "biaya_smkk"
        `);
    }
}
