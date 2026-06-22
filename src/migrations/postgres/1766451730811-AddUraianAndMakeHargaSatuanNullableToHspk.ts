import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUraianAndMakeHargaSatuanNullableToHspk1766451730811 implements MigrationInterface {
    name = 'AddUraianAndMakeHargaSatuanNullableToHspk1766451730811';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add uraian column to hspk table
        await queryRunner.query(`
            ALTER TABLE "hspk"
            ADD COLUMN IF NOT EXISTS "uraian" TEXT NULL
        `);

        // Make harga_satuan nullable
        await queryRunner.query(`
            ALTER TABLE "hspk"
            ALTER COLUMN "harga_satuan" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert harga_satuan to NOT NULL (set default value for existing NULL records first)
        await queryRunner.query(`
            UPDATE "hspk"
            SET "harga_satuan" = 0
            WHERE "harga_satuan" IS NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "hspk"
            ALTER COLUMN "harga_satuan" SET NOT NULL
        `);

        // Drop uraian column
        await queryRunner.query(`
            ALTER TABLE "hspk"
            DROP COLUMN IF EXISTS "uraian"
        `);
    }
}



