import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKeteranganTambahanToUsulanSaluran1770300000003 implements MigrationInterface {
    name = 'AddKeteranganTambahanToUsulanSaluran1770300000003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`usulan_saluran\`
            ADD COLUMN \`keterangan_tambahan\` TEXT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`usulan_saluran\`
            DROP COLUMN \`keterangan_tambahan\`
        `);
    }
}
