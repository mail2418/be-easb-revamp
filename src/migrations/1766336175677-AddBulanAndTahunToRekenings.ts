import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBulanAndTahunToRekenings1766336175677 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get current month and year for default values
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
        const currentYear = currentDate.getFullYear();

        // Add bulan column with default value
        await queryRunner.query(`
            ALTER TABLE "rekenings" 
            ADD COLUMN "bulan" INTEGER NOT NULL DEFAULT ${currentMonth}
        `);

        // Add tahun column with default value
        await queryRunner.query(`
            ALTER TABLE "rekenings" 
            ADD COLUMN "tahun" INTEGER NOT NULL DEFAULT ${currentYear}
        `);

        // Remove default values after setting them (optional, but cleaner)
        await queryRunner.query(`
            ALTER TABLE "rekenings" 
            ALTER COLUMN "bulan" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "rekenings" 
            ALTER COLUMN "tahun" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop columns
        await queryRunner.query(`ALTER TABLE "rekenings" DROP COLUMN "tahun"`);
        await queryRunner.query(`ALTER TABLE "rekenings" DROP COLUMN "bulan"`);
    }
}

