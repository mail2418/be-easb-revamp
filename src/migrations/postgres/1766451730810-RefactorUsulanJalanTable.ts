import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorUsulanJalanTable1766451730810 implements MigrationInterface {
    name = 'RefactorUsulanJalanTable1766451730810';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop old foreign key constraints first
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_jalan_jenis_perkerasan_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_mutu_beton"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_mutu_beton_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_spesifikasi_desain_lentur"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_spesifikasi_desain_lentur_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_spesifikasi_desain_kaku"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_spesifikasi_desain_kaku_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_ruang_lingkup_perkerasan_lentur"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_ruang_lingkup_perkerasan_lentur_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_ruang_lingkup_perkerasan_kaku"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_ruang_lingkup_perkerasan_kaku_review"
        `);

        // Drop old columns
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_jalan_jenis_perkerasan_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_mutu_beton"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_mutu_beton_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_spesifikasi_desain_lentur"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_spesifikasi_desain_lentur_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_spesifikasi_desain_kaku"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_spesifikasi_desain_kaku_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_ruang_lingkup_perkerasan_lentur"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_ruang_lingkup_perkerasan_lentur_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_ruang_lingkup_perkerasan_kaku"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_ruang_lingkup_perkerasan_kaku_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "nama_usulan_jalan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "alamat"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "lebar_jalan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "lebar_jalan_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "keterangan_tambahan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "keterangan_tambahan_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "verified_adbang_at"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "verified_bpkad_at"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "verified_bappeda_at"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "rejected_at"
        `);

        // Rename reject_verif_id to id_reject_verif
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            RENAME COLUMN "reject_verif_id" TO "id_reject_verif"
        `);

        // Make id_jalan_jenis_perkerasan nullable (if it exists)
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_jalan_jenis_perkerasan" DROP NOT NULL
        `);

        // Add new required columns
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "id_asb_jenis" INTEGER NOT NULL DEFAULT 1
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "id_jalan_jenis_pemeliharaan" INTEGER NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "id_rekening" INTEGER NOT NULL DEFAULT 1
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "id_rekening_review" INTEGER NOT NULL DEFAULT 1
        `);

        // Add new core fields
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "is_include_ppn" BOOLEAN NOT NULL DEFAULT false
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "nama_usulan" TEXT NOT NULL DEFAULT ''
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "uraian" TEXT NOT NULL DEFAULT ''
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "spesifikasi" TEXT NOT NULL DEFAULT ''
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "satuan" VARCHAR(255) NOT NULL DEFAULT ''
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "harga_satuan" DECIMAL(15,2) NOT NULL DEFAULT 0
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "deskripsi_desain" TEXT NOT NULL DEFAULT ''
        `);

        // Add new review timestamp columns
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "verifikator_adbang_review_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "verifikator_bpkad_review_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "verifikator_bappeda_review_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "reject_verifikator_review_at" TIMESTAMPTZ NULL
        `);

        // Remove default values after adding columns (for required fields)
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_asb_jenis" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_rekening" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_rekening_review" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "nama_usulan" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "uraian" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "spesifikasi" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "satuan" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "harga_satuan" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "deskripsi_desain" DROP DEFAULT
        `);

        // Add foreign key constraints for new columns
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "FK_usulan_jalan_id_asb_jenis"
            FOREIGN KEY ("id_asb_jenis")
            REFERENCES "asb_jenis"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);

        // Drop existing foreign key constraint for id_jalan_jenis_perkerasan if exists
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_jalan_jenis_perkerasan"
        `);

        // Add foreign key constraints for optional jalan fields (SET NULL)
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "FK_usulan_jalan_id_jalan_jenis_pemeliharaan"
            FOREIGN KEY ("id_jalan_jenis_pemeliharaan")
            REFERENCES "jalan_jenis_pemeliharaan"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "FK_usulan_jalan_id_jalan_jenis_perkerasan"
            FOREIGN KEY ("id_jalan_jenis_perkerasan")
            REFERENCES "jalan_jenis_perkerasan"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE
        `);

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

        // Update foreign key constraint for id_reject_verif (if it exists, drop and recreate)
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_reject_verif_id"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "FK_usulan_jalan_id_reject_verif"
            FOREIGN KEY ("id_reject_verif")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE
        `);

        // Create indexes for new columns
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_id_asb_jenis"
            ON "usulan_jalan"("id_asb_jenis")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_id_jalan_jenis_pemeliharaan"
            ON "usulan_jalan"("id_jalan_jenis_pemeliharaan")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_id_rekening"
            ON "usulan_jalan"("id_rekening")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_id_rekening_review"
            ON "usulan_jalan"("id_rekening_review")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_id_rekening_review"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_id_rekening"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_id_jalan_jenis_pemeliharaan"
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_usulan_jalan_id_asb_jenis"
        `);

        // Drop foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_reject_verif"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_rekening_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_rekening"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_jalan_jenis_perkerasan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_jalan_jenis_pemeliharaan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "FK_usulan_jalan_id_asb_jenis"
        `);

        // Drop new columns
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "reject_verifikator_review_at"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "verifikator_bappeda_review_at"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "verifikator_bpkad_review_at"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "verifikator_adbang_review_at"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "deskripsi_desain"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "harga_satuan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "satuan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "spesifikasi"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "uraian"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "nama_usulan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "is_include_ppn"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_rekening_review"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_rekening"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_jalan_jenis_pemeliharaan"
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_asb_jenis"
        `);

        // Rename id_reject_verif back to reject_verif_id
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            RENAME COLUMN "id_reject_verif" TO "reject_verif_id"
        `);

        // Make id_jalan_jenis_perkerasan NOT NULL again (if needed)
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "id_jalan_jenis_perkerasan" SET NOT NULL
        `);

        // Re-add old columns (with nullable for now)
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "rejected_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "verified_bappeda_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "verified_bpkad_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "verified_adbang_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "keterangan_tambahan_review" TEXT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "keterangan_tambahan" TEXT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "lebar_jalan_review" DOUBLE PRECISION NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "lebar_jalan" DOUBLE PRECISION NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "alamat" TEXT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "nama_usulan_jalan" TEXT NULL
        `);

        // Note: Foreign keys for old columns would need to be re-added if needed
    }
}
