import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Repairs schema drift caused by legacy migrations in src/migrations/
 * (1765000000010/1765000000011) that ran after the postgres migration chain
 * and replaced usulan_jalan / usulan_saluran with simplified JSONB-based tables.
 */
export class RepairUsulanSchemaAfterLegacyMigrations1770600000000 implements MigrationInterface {
    name = 'RepairUsulanSchemaAfterLegacyMigrations1770600000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.repairUsulanJalan(queryRunner);
        await this.repairUsulanSaluran(queryRunner);
        await this.ensureSaluranSpesifikasiSmkkTables(queryRunner);
    }

    private async repairUsulanJalan(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_jenis_perkerasan_review";
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_verifikator_adbang";
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_verifikator_bpkad";
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_verifikator_bappeda";
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            DROP COLUMN IF EXISTS "id_jalan_jenis_perkerasan_review",
            DROP COLUMN IF EXISTS "lebar_jalan_review",
            DROP COLUMN IF EXISTS "keterangan_tambahan",
            DROP COLUMN IF EXISTS "keterangan_tambahan_review",
            DROP COLUMN IF EXISTS "data_ruang_lingkup",
            DROP COLUMN IF EXISTS "data_smkk",
            DROP COLUMN IF EXISTS "verified_adbang_at",
            DROP COLUMN IF EXISTS "verified_bpkad_at",
            DROP COLUMN IF EXISTS "verified_bappeda_at",
            DROP COLUMN IF EXISTS "rejected_at";
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD COLUMN IF NOT EXISTS "is_include_ppn" BOOLEAN NOT NULL DEFAULT false,
            ADD COLUMN IF NOT EXISTS "uraian" TEXT NULL,
            ADD COLUMN IF NOT EXISTS "spesifikasi" TEXT NULL,
            ADD COLUMN IF NOT EXISTS "satuan" VARCHAR(255) NULL,
            ADD COLUMN IF NOT EXISTS "deskripsi_desain" TEXT NULL,
            ADD COLUMN IF NOT EXISTS "total_harga" DECIMAL(15, 2) NULL,
            ADD COLUMN IF NOT EXISTS "biaya_smkk" DECIMAL(15, 2) NULL,
            ADD COLUMN IF NOT EXISTS "verifikator_adbang_review_at" TIMESTAMPTZ NULL,
            ADD COLUMN IF NOT EXISTS "verifikator_bpkad_review_at" TIMESTAMPTZ NULL,
            ADD COLUMN IF NOT EXISTS "verifikator_bappeda_review_at" TIMESTAMPTZ NULL,
            ADD COLUMN IF NOT EXISTS "reject_verifikator_review_at" TIMESTAMPTZ NULL;
        `);

        await queryRunner.query(`
            UPDATE "usulan_jalan"
            SET "tahun_anggaran" = EXTRACT(YEAR FROM CURRENT_DATE)::int
            WHERE "tahun_anggaran" IS NULL;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ALTER COLUMN "tahun_anggaran" SET NOT NULL;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_usulan_jalan_verifikator_adbang'
                ) THEN
                    ALTER TABLE "usulan_jalan"
                    ADD CONSTRAINT "fk_usulan_jalan_verifikator_adbang"
                    FOREIGN KEY ("id_verifikator_adbang")
                    REFERENCES "users"("id")
                    ON DELETE SET NULL;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_usulan_jalan_verifikator_bpkad'
                ) THEN
                    ALTER TABLE "usulan_jalan"
                    ADD CONSTRAINT "fk_usulan_jalan_verifikator_bpkad"
                    FOREIGN KEY ("id_verifikator_bpkad")
                    REFERENCES "users"("id")
                    ON DELETE SET NULL;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_usulan_jalan_verifikator_bappeda'
                ) THEN
                    ALTER TABLE "usulan_jalan"
                    ADD CONSTRAINT "fk_usulan_jalan_verifikator_bappeda"
                    FOREIGN KEY ("id_verifikator_bappeda")
                    REFERENCES "users"("id")
                    ON DELETE SET NULL;
                END IF;
            END $$;
        `);
    }

    private async repairUsulanSaluran(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_adbang";
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_bpkad";
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_bappeda";
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            DROP COLUMN IF EXISTS "data_ruang_lingkup",
            DROP COLUMN IF EXISTS "data_smkk",
            DROP COLUMN IF EXISTS "rejected_at";
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD COLUMN IF NOT EXISTS "uraian" TEXT NULL,
            ADD COLUMN IF NOT EXISTS "spesifikasi" TEXT NULL,
            ADD COLUMN IF NOT EXISTS "satuan" VARCHAR(255) NULL,
            ADD COLUMN IF NOT EXISTS "deskripsi_desain" TEXT NULL,
            ADD COLUMN IF NOT EXISTS "total_harga" DECIMAL(15, 2) NULL,
            ADD COLUMN IF NOT EXISTS "biaya_smkk" DECIMAL(15, 2) NULL,
            ADD COLUMN IF NOT EXISTS "reject_verifikator_review_at" TIMESTAMPTZ NULL;
        `);

        await queryRunner.query(`
            UPDATE "usulan_saluran"
            SET "tahun_anggaran" = EXTRACT(YEAR FROM CURRENT_DATE)::int
            WHERE "tahun_anggaran" IS NULL;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ALTER COLUMN "tahun_anggaran" SET NOT NULL;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_usulan_saluran_verifikator_adbang'
                ) THEN
                    ALTER TABLE "usulan_saluran"
                    ADD CONSTRAINT "fk_usulan_saluran_verifikator_adbang"
                    FOREIGN KEY ("id_verifikator_adbang")
                    REFERENCES "users"("id")
                    ON DELETE SET NULL;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_usulan_saluran_verifikator_bpkad'
                ) THEN
                    ALTER TABLE "usulan_saluran"
                    ADD CONSTRAINT "fk_usulan_saluran_verifikator_bpkad"
                    FOREIGN KEY ("id_verifikator_bpkad")
                    REFERENCES "users"("id")
                    ON DELETE SET NULL;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_usulan_saluran_verifikator_bappeda'
                ) THEN
                    ALTER TABLE "usulan_saluran"
                    ADD CONSTRAINT "fk_usulan_saluran_verifikator_bappeda"
                    FOREIGN KEY ("id_verifikator_bappeda")
                    REFERENCES "users"("id")
                    ON DELETE SET NULL;
                END IF;
            END $$;
        `);
    }

    private async ensureSaluranSpesifikasiSmkkTables(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "saluran_spesifikasi_smkk" (
                "id" SERIAL PRIMARY KEY,
                "id_jenis_usulan" INTEGER NOT NULL,
                "id_usulan_saluran" INTEGER NOT NULL,
                "id_jalan_saluran_smkk" INTEGER NOT NULL,
                "harga_spec" DECIMAL(15, 2) NOT NULL,
                "jumlah_barang" DECIMAL(15, 2) NOT NULL,
                "harga_satuan" DECIMAL(15, 2) NOT NULL DEFAULT 0,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_saluran_spesifikasi_smkk_jenis_usulan'
                ) THEN
                    ALTER TABLE "saluran_spesifikasi_smkk"
                    ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_jenis_usulan"
                    FOREIGN KEY ("id_jenis_usulan")
                    REFERENCES "jenis_usulan"("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_saluran_spesifikasi_smkk_usulan_saluran'
                ) THEN
                    ALTER TABLE "saluran_spesifikasi_smkk"
                    ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_usulan_saluran"
                    FOREIGN KEY ("id_usulan_saluran")
                    REFERENCES "usulan_saluran"("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_saluran_spesifikasi_smkk_jalan_saluran_smkk'
                ) THEN
                    ALTER TABLE "saluran_spesifikasi_smkk"
                    ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_jalan_saluran_smkk"
                    FOREIGN KEY ("id_jalan_saluran_smkk")
                    REFERENCES "jalan_saluran_smkk"("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_jenis_usulan"
            ON "saluran_spesifikasi_smkk" ("id_jenis_usulan");
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_usulan_saluran"
            ON "saluran_spesifikasi_smkk" ("id_usulan_saluran");
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_jalan_saluran_smkk"
            ON "saluran_spesifikasi_smkk" ("id_jalan_saluran_smkk");
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_deleted"
            ON "saluran_spesifikasi_smkk" ("deleted_at");
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "saluran_spesifikasi_smkk_review" (
                "id" SERIAL PRIMARY KEY,
                "id_jenis_usulan" INTEGER NOT NULL,
                "id_usulan_saluran" INTEGER NOT NULL,
                "id_jalan_saluran_smkk" INTEGER NOT NULL,
                "harga_spec" DECIMAL(15, 2) NOT NULL,
                "jumlah_barang" DECIMAL(15, 2) NOT NULL,
                "harga_satuan" DECIMAL(15, 2) NOT NULL DEFAULT 0,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_saluran_spesifikasi_smkk_review_jenis_usulan'
                ) THEN
                    ALTER TABLE "saluran_spesifikasi_smkk_review"
                    ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_review_jenis_usulan"
                    FOREIGN KEY ("id_jenis_usulan")
                    REFERENCES "jenis_usulan"("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_saluran_spesifikasi_smkk_review_usulan_saluran'
                ) THEN
                    ALTER TABLE "saluran_spesifikasi_smkk_review"
                    ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_review_usulan_saluran"
                    FOREIGN KEY ("id_usulan_saluran")
                    REFERENCES "usulan_saluran"("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_saluran_spesifikasi_smkk_review_jalan_saluran_smkk'
                ) THEN
                    ALTER TABLE "saluran_spesifikasi_smkk_review"
                    ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_review_jalan_saluran_smkk"
                    FOREIGN KEY ("id_jalan_saluran_smkk")
                    REFERENCES "jalan_saluran_smkk"("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE;
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_review_jenis_usulan"
            ON "saluran_spesifikasi_smkk_review" ("id_jenis_usulan");
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_review_usulan_saluran"
            ON "saluran_spesifikasi_smkk_review" ("id_usulan_saluran");
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_review_jalan_saluran_smkk"
            ON "saluran_spesifikasi_smkk_review" ("id_jalan_saluran_smkk");
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_review_deleted"
            ON "saluran_spesifikasi_smkk_review" ("deleted_at");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "saluran_spesifikasi_smkk_review";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "saluran_spesifikasi_smkk";`);
    }
}
