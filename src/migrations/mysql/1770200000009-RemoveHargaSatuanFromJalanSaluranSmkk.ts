import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveHargaSatuanFromJalanSaluranSmkk1770200000009 implements MigrationInterface {
    name = 'RemoveHargaSatuanFromJalanSaluranSmkk1770200000009';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            DROP COLUMN \`harga_satuan\`
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            ADD COLUMN \`harga_satuan\` decimal(15, 2) NULL
        `);
    }
}
