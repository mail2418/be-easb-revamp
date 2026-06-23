import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBulanAndTahunToRekenings1766336175677 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        await queryRunner.query(`
            ALTER TABLE "rekenings" 
            ADD COLUMN "bulan" INTEGER NOT NULL DEFAULT ${currentMonth}
        `);

        await queryRunner.query(`
            ALTER TABLE "rekenings" 
            ADD COLUMN "tahun" INTEGER NOT NULL DEFAULT ${currentYear}
        `);

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
