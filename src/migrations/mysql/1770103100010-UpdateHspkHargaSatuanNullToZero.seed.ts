import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateHspkHargaSatuanNullToZero1770103100010 implements MigrationInterface {
    name = 'UpdateHspkHargaSatuanNullToZero1770103100010';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update all HSPK records where harga_satuan is NULL to 0
        await queryRunner.query(`
            UPDATE \`hspk\`
            SET \`harga_satuan\` = 0
            WHERE \`harga_satuan\` IS NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert: Set harga_satuan back to NULL where it was 0
        await queryRunner.query(`
            UPDATE \`hspk\`
            SET \`harga_satuan\` = NULL
            WHERE \`harga_satuan\` = 0
        `);
    }
}
