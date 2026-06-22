import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorJalanSaluranSmkkTable1767891146384 implements MigrationInterface {
    name = 'RefactorJalanSaluranSmkkTable1767891146384';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Drop all data from jalan_saluran_smkk
        await queryRunner.query(`DELETE FROM "jalan_saluran_smkk";`);

        // Step 2: Drop foreign key constraint and index for id_ruang_lingkup
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_smkk_ruang_lingkup";
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_saluran_smkk_ruang_lingkup";
        `);

        // Step 3: Drop unique constraint that includes id_ruang_lingkup
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            DROP CONSTRAINT IF EXISTS "uq_jalan_saluran_smkk_ruang_lingkup_no_mata_uraian";
        `);

        // Step 4: Remove id_ruang_lingkup column
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            DROP COLUMN IF EXISTS "id_ruang_lingkup";
        `);

        // Step 5: Add id_jenis_usulan column
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD COLUMN IF NOT EXISTS "id_jenis_usulan" INTEGER NOT NULL DEFAULT 2;
        `);

        // Step 6: Add foreign key constraint for id_jenis_usulan
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD CONSTRAINT "fk_jalan_saluran_smkk_jenis_usulan"
            FOREIGN KEY ("id_jenis_usulan")
            REFERENCES "jenis_usulan"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        // Step 7: Create index for id_jenis_usulan
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_smkk_jenis_usulan" 
            ON "jalan_saluran_smkk" ("id_jenis_usulan");
        `);

        // Step 8: Create new unique constraint without id_ruang_lingkup
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD CONSTRAINT "uq_jalan_saluran_smkk_jenis_usulan_no_mata_uraian"
            UNIQUE ("id_jenis_usulan", "no_mata_pembayaran", "uraian");
        `);

        // Step 9: Drop id=1 and id=12 from jalan_saluran_ruang_lingkup
        // First, check if there are any foreign key references
        await queryRunner.query(`
            DELETE FROM "jalan_saluran_ruang_lingkup"
            WHERE "id" IN (1, 12);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse the changes
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            DROP CONSTRAINT IF EXISTS "uq_jalan_saluran_smkk_jenis_usulan_no_mata_uraian";
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_saluran_smkk_jenis_usulan";
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_smkk_jenis_usulan";
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            DROP COLUMN IF EXISTS "id_jenis_usulan";
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD COLUMN IF NOT EXISTS "id_ruang_lingkup" INTEGER;
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD CONSTRAINT "fk_jalan_saluran_smkk_ruang_lingkup"
            FOREIGN KEY ("id_ruang_lingkup")
            REFERENCES "jalan_saluran_ruang_lingkup"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_smkk_ruang_lingkup" 
            ON "jalan_saluran_smkk" ("id_ruang_lingkup");
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_smkk"
            ADD CONSTRAINT "uq_jalan_saluran_smkk_ruang_lingkup_no_mata_uraian"
            UNIQUE ("id_ruang_lingkup", "no_mata_pembayaran", "uraian");
        `);
    }
}
