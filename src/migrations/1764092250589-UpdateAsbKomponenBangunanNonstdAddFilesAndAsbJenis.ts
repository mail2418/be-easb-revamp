import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAsbKomponenBangunanNonstdAddFilesAndAsbJenis1764092250589 implements MigrationInterface {
    name = 'UpdateAsbKomponenBangunanNonstdAddFilesAndAsbJenis1764092250589';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop kolom bobot_* lama
        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_nonstd"
            DROP COLUMN IF EXISTS "bobot_min",
            DROP COLUMN IF EXISTS "bobot",
            DROP COLUMN IF EXISTS "bobot_max";
        `);

        // Tambah kolom files, id_asb_jenis, id_asb_tipe_bangunan
        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_nonstd"
            ADD COLUMN IF NOT EXISTS "files" VARCHAR(20) NOT NULL,
            ADD COLUMN IF NOT EXISTS "id_asb_jenis" INTEGER NOT NULL,
            ADD COLUMN IF NOT EXISTS "id_asb_tipe_bangunan" INTEGER NOT NULL;
        `);

        // Index untuk id_asb_jenis
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_nonstd_id_asb_jenis"
            ON "asb_komponen_bangunan_nonstd" ("id_asb_jenis");
        `);

        // Index untuk id_asb_tipe_bangunan
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_nonstd_id_asb_tipe_bangunan"
            ON "asb_komponen_bangunan_nonstd" ("id_asb_tipe_bangunan");
        `);

        // Foreign key ke asb_jenis(id)
        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_nonstd"
            ADD CONSTRAINT "fk_asb_komponen_bangunan_nonstd_id_asb_jenis"
            FOREIGN KEY ("id_asb_jenis") REFERENCES "asb_jenis" ("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        // Foreign key ke asb_tipe_bangunan(id)
        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_nonstd"
            ADD CONSTRAINT "fk_asb_komponen_bangunan_nonstd_id_asb_tipe_bangunan"
            FOREIGN KEY ("id_asb_tipe_bangunan") REFERENCES "asb_tipe_bangunan" ("id")
            ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop FK dan index
        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_nonstd"
            DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_nonstd_id_asb_jenis";
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_nonstd_id_asb_jenis";
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_nonstd"
            DROP CONSTRAINT IF EXISTS "fk_asb_komponen_bangunan_nonstd_id_asb_tipe_bangunan";
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_nonstd_id_asb_tipe_bangunan";
        `);

        // Drop kolom baru
        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_nonstd"
            DROP COLUMN IF EXISTS "files",
            DROP COLUMN IF EXISTS "id_asb_jenis",
            DROP COLUMN IF EXISTS "id_asb_tipe_bangunan";
        `);

        // Tambah lagi kolom bobot_* seperti semula
        await queryRunner.query(`
            ALTER TABLE "asb_komponen_bangunan_nonstd"
            ADD COLUMN "bobot_min" DOUBLE PRECISION NOT NULL,
            ADD COLUMN "bobot" DOUBLE PRECISION NOT NULL,
            ADD COLUMN "bobot_max" DOUBLE PRECISION NOT NULL;
        `);
    }
}
