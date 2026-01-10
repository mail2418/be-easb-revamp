import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHargaSatuanToJalanSaluranSpesifikasiSmkkReview1770200000011 implements MigrationInterface {
    name = 'AddHargaSatuanToJalanSaluranSpesifikasiSmkkReview1770200000011';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            ADD COLUMN \`harga_satuan\` decimal(15, 2) NOT NULL DEFAULT 0
        `);

        await queryRunner.query(`
            UPDATE \`jalan_saluran_spesifikasi_smkk_review\`
            SET \`harga_satuan\` = CASE WHEN \`jumlah_barang\` > 0 THEN \`harga_spec\` / \`jumlah_barang\` ELSE 0 END
            WHERE \`jumlah_barang\` > 0
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            MODIFY COLUMN \`harga_satuan\` decimal(15, 2) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            DROP COLUMN \`harga_satuan\`
        `);
    }
}
