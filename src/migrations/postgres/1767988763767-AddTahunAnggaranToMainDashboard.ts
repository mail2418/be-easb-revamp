import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTahunAnggaranToMainDashboard1767988763767 implements MigrationInterface {
    name = 'AddTahunAnggaranToMainDashboard1767988763767';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add tahun_anggaran column
        await queryRunner.query(`
            ALTER TABLE "main_dashboard" 
            ADD COLUMN IF NOT EXISTS "tahun_anggaran" INTEGER NULL;
        `);

        // Create index for tahun_anggaran
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_main_dashboard_tahun_anggaran" 
            ON "main_dashboard" ("tahun_anggaran");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop index
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_main_dashboard_tahun_anggaran";`);

        // Drop column
        await queryRunner.query(`ALTER TABLE "main_dashboard" DROP COLUMN IF EXISTS "tahun_anggaran";`);
    }
}
