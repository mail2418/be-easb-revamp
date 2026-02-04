import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRekapitulasiBiayaKonstruksiPrecision1765383248686 implements MigrationInterface {
    name = 'UpdateRekapitulasiBiayaKonstruksiPrecision1765383248686';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update precision for rekapitulasi_biaya_konstruksi from DECIMAL(10,2) to DECIMAL(20,2)
        await queryRunner.query(`
            ALTER TABLE "asb"
            ALTER COLUMN "rekapitulasi_biaya_konstruksi" TYPE DECIMAL(20,2)
        `);

        // Update precision for rekapitulasi_biaya_konstruksi_rounded from DECIMAL(10,2) to DECIMAL(20,2)
        await queryRunner.query(`
            ALTER TABLE "asb"
            ALTER COLUMN "rekapitulasi_biaya_konstruksi_rounded" TYPE DECIMAL(20,2)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert precision for rekapitulasi_biaya_konstruksi_rounded back to DECIMAL(10,2)
        await queryRunner.query(`
            ALTER TABLE "asb"
            ALTER COLUMN "rekapitulasi_biaya_konstruksi_rounded" TYPE DECIMAL(10,2)
        `);

        // Revert precision for rekapitulasi_biaya_konstruksi back to DECIMAL(10,2)
        await queryRunner.query(`
            ALTER TABLE "asb"
            ALTER COLUMN "rekapitulasi_biaya_konstruksi" TYPE DECIMAL(10,2)
        `);
    }
}

