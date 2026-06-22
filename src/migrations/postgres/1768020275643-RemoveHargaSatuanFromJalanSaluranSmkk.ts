import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveHargaSatuanFromJalanSaluranSmkk1768020275643 implements MigrationInterface {
    name = 'RemoveHargaSatuanFromJalanSaluranSmkk1768020275643';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            DROP COLUMN IF EXISTS "harga_satuan";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD COLUMN IF NOT EXISTS "harga_satuan" DECIMAL(15, 2) NULL;
        `);
    }
}
