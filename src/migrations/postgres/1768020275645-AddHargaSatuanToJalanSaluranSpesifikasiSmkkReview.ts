import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHargaSatuanToJalanSaluranSpesifikasiSmkkReview1768020275645 implements MigrationInterface {
    name = 'AddHargaSatuanToJalanSaluranSpesifikasiSmkkReview1768020275645';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            ADD COLUMN IF NOT EXISTS "harga_satuan" DECIMAL(15, 2) NOT NULL DEFAULT 0;
        `);

        await queryRunner.query(`
            UPDATE "jalan_saluran_spesifikasi_smkk_review"
            SET "harga_satuan" = CASE 
                WHEN "jumlah_barang" > 0 THEN "harga_spec" / "jumlah_barang"
                ELSE 0
            END
            WHERE "jumlah_barang" > 0;
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            ALTER COLUMN "harga_satuan" DROP DEFAULT;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            DROP COLUMN IF EXISTS "harga_satuan";
        `);
    }
}
