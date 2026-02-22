import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameJalanSmkkToSmkkGlobal1767629950945 implements MigrationInterface {
    name = 'RenameJalanSmkkToSmkkGlobal1767629950945';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Rename table from jalan_smkk to smkk_global
        await queryRunner.query(`
            ALTER TABLE "jalan_smkk" RENAME TO "smkk_global"
        `);

        // Rename index from idx_jalan_smkk_bulan_tahun to idx_smkk_global_bulan_tahun
        await queryRunner.query(`
            ALTER INDEX IF EXISTS "idx_jalan_smkk_bulan_tahun" RENAME TO "idx_smkk_global_bulan_tahun"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert: Rename index back
        await queryRunner.query(`
            ALTER INDEX IF EXISTS "idx_smkk_global_bulan_tahun" RENAME TO "idx_jalan_smkk_bulan_tahun"
        `);

        // Revert: Rename table back
        await queryRunner.query(`
            ALTER TABLE "smkk_global" RENAME TO "jalan_smkk"
        `);
    }
}

