import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKeteranganTambahanToUsulanSaluran1770300000012 implements MigrationInterface {
    name = 'AddKeteranganTambahanToUsulanSaluran1770300000012';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD COLUMN IF NOT EXISTS "keterangan_tambahan" TEXT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            DROP COLUMN IF EXISTS "keterangan_tambahan";
        `);
    }
}
