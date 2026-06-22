import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeRekeningNullableInUsulanJalan1766826550858 implements MigrationInterface {
    name = 'MakeRekeningAndCoreFieldsNullableInUsulanJalan1766826550858';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop existing foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_rekening"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_rekening_review"
        `);

        // Make columns nullable
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_rekening" DROP NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_rekening_review" DROP NOT NULL
        `);

        // Make core fields nullable
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "uraian" DROP NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "satuan" DROP NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "deskripsi_desain" DROP NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "spesifikasi" DROP NOT NULL
        `);

        // Note: lebar and total_harga are already nullable

        // Re-add foreign key constraints with SET NULL on delete
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "FK_usulan_jalan_id_rekening"
            FOREIGN KEY ("id_rekening")
            REFERENCES "rekenings"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "FK_usulan_jalan_id_rekening_review"
            FOREIGN KEY ("id_rekening_review")
            REFERENCES "rekenings"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_rekening_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_rekening"
        `);

        // Make columns NOT NULL again (will fail if there are NULL values)
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_rekening_review" SET NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_rekening" SET NOT NULL
        `);

        // Make core fields NOT NULL again (will fail if there are NULL values)
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "deskripsi_desain" SET NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "satuan" SET NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "uraian" SET NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "spesifikasi" SET NOT NULL
        `);

        // Re-add foreign key constraints with CASCADE on delete
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "FK_usulan_jalan_id_rekening"
            FOREIGN KEY ("id_rekening")
            REFERENCES "rekenings"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "FK_usulan_jalan_id_rekening_review"
            FOREIGN KEY ("id_rekening_review")
            REFERENCES "rekenings"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);
    }
}

