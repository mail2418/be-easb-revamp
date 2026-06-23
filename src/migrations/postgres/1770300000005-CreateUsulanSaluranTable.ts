import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsulanSaluranTable1770300000005 implements MigrationInterface {
    name = 'CreateUsulanSaluranTable1770300000005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "usulan_saluran" (
                "id" SERIAL PRIMARY KEY,
                "id_opd" INTEGER NOT NULL,
                "id_usulan_saluran_status" INTEGER NOT NULL,
                "id_asb_jenis" INTEGER NOT NULL,
                "id_rekening" INTEGER NULL,
                "id_rekening_review" INTEGER NULL,
                "id_tipe_saluran" INTEGER NULL,
                "id_kabkota" INTEGER NULL,
                "id_kecamatan" INTEGER NULL,
                "id_kelurahan" INTEGER NULL,
                "id_verifikator_adbang" INTEGER NULL,
                "id_verifikator_bpkad" INTEGER NULL,
                "id_verifikator_bappeda" INTEGER NULL,
                "id_reject_verif" INTEGER NULL,
                "reject_reason" TEXT NULL,
                "verifikator_adbang_review_at" TIMESTAMPTZ NULL,
                "verifikator_bpkad_review_at" TIMESTAMPTZ NULL,
                "verifikator_bappeda_review_at" TIMESTAMPTZ NULL,
                "reject_verifikator_review_at" TIMESTAMPTZ NULL,
                "is_include_ppn" BOOLEAN NOT NULL DEFAULT false,
                "tahun_anggaran" INTEGER NOT NULL,
                "nama_usulan" TEXT NOT NULL,
                "alamat" TEXT NULL,
                "uraian" TEXT NULL,
                "spesifikasi" TEXT NULL,
                "satuan" VARCHAR(255) NULL,
                "deskripsi_desain" TEXT NULL,
                "lebar" DOUBLE PRECISION NULL,
                "total_harga" DECIMAL(15, 2) NULL,
                "biaya_smkk" DECIMAL(15, 2) NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_opd"
            FOREIGN KEY ("id_opd")
            REFERENCES "opds"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_usulan_saluran_status"
            FOREIGN KEY ("id_usulan_saluran_status")
            REFERENCES "usulan_saluran_status"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_asb_jenis"
            FOREIGN KEY ("id_asb_jenis")
            REFERENCES "asb_jenis"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_rekening"
            FOREIGN KEY ("id_rekening")
            REFERENCES "rekenings"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_rekening_review"
            FOREIGN KEY ("id_rekening_review")
            REFERENCES "rekenings"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_tipe_saluran"
            FOREIGN KEY ("id_tipe_saluran")
            REFERENCES "tipe_saluran"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_kabkota"
            FOREIGN KEY ("id_kabkota")
            REFERENCES "kabkotas"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_kecamatan"
            FOREIGN KEY ("id_kecamatan")
            REFERENCES "kecamatans"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_kelurahan"
            FOREIGN KEY ("id_kelurahan")
            REFERENCES "kelurahans"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_verifikator_adbang"
            FOREIGN KEY ("id_verifikator_adbang")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_verifikator_bpkad"
            FOREIGN KEY ("id_verifikator_bpkad")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_verifikator_bappeda"
            FOREIGN KEY ("id_verifikator_bappeda")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_reject_verif"
            FOREIGN KEY ("id_reject_verif")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_status_tahun"
            ON "usulan_saluran" ("id_usulan_saluran_status", "tahun_anggaran");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_opd" ON "usulan_saluran" ("id_opd");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_deleted" ON "usulan_saluran" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_usulan_saluran_updated_at') THEN
                    CREATE TRIGGER set_usulan_saluran_updated_at
                    BEFORE UPDATE ON "usulan_saluran"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_usulan_saluran_updated_at ON "usulan_saluran";`,
        );
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_opd";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_status_tahun";`);
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_reject_verif";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_bappeda";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_bpkad";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_adbang";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_kelurahan";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_kecamatan";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_kabkota";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_tipe_saluran";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_rekening_review";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_rekening";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_asb_jenis";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_usulan_saluran_status";`,
        );
        await queryRunner.query(
            `ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_opd";`,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_saluran";`);
    }
}
