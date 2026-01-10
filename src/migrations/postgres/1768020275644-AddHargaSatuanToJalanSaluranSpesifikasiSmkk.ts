import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHargaSatuanToJalanSaluranSpesifikasiSmkk1768020275644 implements MigrationInterface {
    name = 'AddHargaSatuanToJalanSaluranSpesifikasiSmkk1768020275644';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk"
            ADD COLUMN IF NOT EXISTS "harga_satuan" DECIMAL(15, 2) NOT NULL DEFAULT 0;
        `);

        await queryRunner.query(`
            UPDATE "jalan_saluran_spesifikasi_smkk"
            SET "harga_satuan" = CASE 
                WHEN "jumlah_barang" > 0 THEN "harga_spec" / "jumlah_barang"
                ELSE 0
            END
            WHERE "jumlah_barang" > 0;
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk"
            ALTER COLUMN "harga_satuan" DROP DEFAULT;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk"
            DROP COLUMN IF EXISTS "harga_satuan";
        `);
    }
}
